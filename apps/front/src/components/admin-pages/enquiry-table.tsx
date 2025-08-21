import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  CarIcon,
  Eye,
  InfoIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fetch } from "@/lib/fetcher";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export function EnquiryTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] = useState<any | null>(
    null
  );
  const [searchTerm, setSearchTerm] = useState("");

  const { data } = useQuery<any[]>({
    queryKey: ["enquiry"],
    queryFn: () =>
      Fetch({
        url: "/enquiry",
        method: "GET",
      }),
  });

  const exportEnquiry = useMutation({
    mutationKey: ["export-enquiry"],
    mutationFn: async () => {
      return await Fetch<Blob>({
        url: "/enquiry/export",
        responseType: "blob",
        method: "GET",
      })
        .then((res) => {
          const url = URL.createObjectURL(res);
          const link = document.createElement("a");
          link.href = url;
          link.download = "enquiry.xlsx";
          link.click();
          URL.revokeObjectURL(url);
        })
        .catch((err) => {
          toast.error(err?.message);
        });
    },
  });

  // Define the columns for our table
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "name",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Fll Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.original?.customer?.name}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.original?.customer?.email}</div>,
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
      cell: ({ row }) => <div>{row.original?.customer?.phone}</div>,
    },
    {
      accessorKey: "address",
      header: "Address",
      cell: ({ row }) => <div>{row.original?.customer?.address}</div>,
    },
    {
      accessorKey: "model",
      header: "Vehicle",
    },
    {
      accessorKey: "remarks",
      header: "Remarks",
      cell: ({ row }) => (
        <div className="max-w-[200px] overflow-hidden overflow-ellipsis">
          {row.original?.remarks}
        </div>
      ),
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const registration = row.original;

        return (
          <div>
            <Eye
              onClick={() => {
                setSelectedRegistration(registration);
                setOpen(true);
              }}
            />
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: data ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      rowSelection,
      globalFilter: searchTerm,
    },
    onGlobalFilterChange: setSearchTerm,
    globalFilterFn: (row, _columnId, filterValue) => {
      const searchValue = filterValue.toLowerCase();

      // Search in firstName, lastName, email, and phone
      const firstName = String(row.getValue("firstName")).toLowerCase();
      const lastName = String(row.getValue("lastName")).toLowerCase();
      const email = String(row.getValue("email")).toLowerCase();
      const phone = String(row.getValue("phone")).toLowerCase();

      return (
        firstName.includes(searchValue) ||
        lastName.includes(searchValue) ||
        email.includes(searchValue) ||
        phone.includes(searchValue)
      );
    },
  });
  if (!data) return <div className="w-full">No Enquiry</div>;

  return (
    <div className="space-y-4 w-full ">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div>
          <Button
            variant="outline"
            type="button"
            onClick={() => exportEnquiry.mutate()}
          >
            {exportEnquiry.isPending ? "Exporting..." : "Export Excel"}
          </Button>
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Dialog for changing status */}
      {selectedRegistration && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">
                Enquiry Details
              </DialogTitle>
              <DialogDescription>
                Enquiry #{selectedRegistration?.id}
              </DialogDescription>
            </DialogHeader>

            <div className="py-4">
              {/* Customer Details */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  CUSTOMER INFORMATION
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    <span>{selectedRegistration?.customer?.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-gray-500" />
                    <span>{selectedRegistration?.customer?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-gray-500" />
                    <span>{selectedRegistration?.customer?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <CarIcon className="h-4 w-4 text-gray-500" />
                  <span>Vehicle: {selectedRegistration?.model}</span>
                </div>
              </div>

              {/* Additional Information */}
              {selectedRegistration?.remarks && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    ADDITIONAL INFORMATION
                  </h3>
                  <div className="flex items-start gap-2">
                    <InfoIcon className="h-4 w-4 text-gray-500 mt-1" />
                    <span>{selectedRegistration?.remarks}</span>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
