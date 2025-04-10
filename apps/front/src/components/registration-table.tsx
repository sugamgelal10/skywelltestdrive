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
import { format } from "date-fns";
import {
  ArrowUpDown,
  CalendarIcon,
  CarIcon,
  Eye,
  InfoIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fetch } from "@/lib/fetcher";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Define the type for our registration data
type Registration = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  vehicle: string;
  date: Date;
  location: string;
  address: string;
  updatedAt: any;
  additionalInfo: string;
  status: "pending" | "approved" | "completed" | "cancelled";
};

const formSchema = z.object({
  status: z.enum(["pending", "approved", "completed", "cancelled"]),
});

export function RegistrationsTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [open, setOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      status: "pending",
    },
  });
  const queryClient = useQueryClient();
  const { data } = useQuery<Registration[]>({
    queryKey: ["test-drive"],
    queryFn: () =>
      Fetch({
        url: "/test-drive-registration",
        method: "GET",
      }),
  });
  const updateStatus = useMutation({
    mutationFn: ({
      data,
      id,
    }: {
      data: z.infer<typeof formSchema>;
      id: string;
    }) => {
      return Fetch({
        url: `/test-drive-registration/${id}`,
        method: "PATCH",
        data: data,
      });
    },
    onSuccess: () => {
      setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["test-drive"] });
      // You would typically refetch data or update local state here
    },
  });

  const onSubmit = (formData: z.infer<typeof formSchema>) => {
    if (!selectedRegistration) return;

    updateStatus.mutate({ data: formData, id: selectedRegistration.id });
  };

  // const deleteMutation = useMutation({
  //   mutationFn: (id: string) => {
  //     return Fetch({
  //       url: `/test-drive-registration/${id}`,
  //       method: "DELETE",
  //     });
  //   },
  // });

  // Define the columns for our table
  const columns: ColumnDef<Registration>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("id")}</div>
      ),
    },
    {
      accessorKey: "firstName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            First Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "lastName",
      header: "Last Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone Number",
    },
    {
      accessorKey: "vehicle",
      header: "Vehicle",
    },
    {
      accessorKey: "date",
      header: "Test Drive Date",
      cell: ({ row }) => {
        const date = row.getValue("date") as Date;
        return <div>{format(new Date(date), "PPP")}</div>;
      },
    },
    {
      accessorKey: "address",
      header: "Address",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;

        return (
          <Badge
            variant={
              status === "approved"
                ? "success"
                : status === "pending"
                  ? "warning"
                  : status === "completed"
                    ? "default"
                    : "destructive"
            }
          >
            {status?.charAt(0).toUpperCase() + status?.slice(1)}
          </Badge>
        );
      },
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
                form.reset({ status: registration.status });
                setOpen(true);
                console.log();
              }}
            />
          </div>
          // <DropdownMenu>
          //   <DropdownMenuTrigger asChild>
          //     <Button
          //       variant="ghost"
          //       className="h-8 w-8 p-0"
          //       onClick={() => console.log("hi")}
          //     >
          //       <span className="sr-only">Open menu</span>
          //       <MoreHorizontal className="h-4 w-4" />
          //     </Button>
          //   </DropdownMenuTrigger>
          //   <DropdownMenuContent align="end">
          //     <DropdownMenuLabel>Actions</DropdownMenuLabel>
          //     <DropdownMenuItem
          //       onClick={() => {
          //         setSelectedRegistration(registration);
          //         form.reset({ status: registration.status });
          //         setOpen(true);
          //         console.log();
          //       }}
          //     >
          //       Change Status
          //     </DropdownMenuItem>
          //     <DropdownMenuSeparator />
          //     <DropdownMenuItem
          //       className="text-destructive"
          //       onClick={() => {
          //         deleteMutation.mutate(registration.id);
          //       }}
          //     >
          //       Delete registration
          //     </DropdownMenuItem>
          //   </DropdownMenuContent>
          // </DropdownMenu>
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
  if (!data) return <div className="w-full">No Test Drive</div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Input
          placeholder="Search by name, email, or phone..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
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
                Booking Details
              </DialogTitle>
              <DialogDescription>
                Booking #{selectedRegistration?.id} - Last updated on{" "}
                {new Date(selectedRegistration?.updatedAt).toLocaleString()}
              </DialogDescription>
            </DialogHeader>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          defaultValue={selectedRegistration.status}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="approved">Approved</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="mt-4 flex justify-end">
                  <Button type="submit">Change</Button>
                </div>
              </form>
            </Form>

            <div className="py-4">
              {/* Status Badge */}
              <div className="mb-4 flex justify-end">
                <Badge
                  className={`${selectedRegistration?.status === "completed" ? "bg-green-500" : "bg-blue-500"} text-white`}
                >
                  {selectedRegistration?.status.charAt(0).toUpperCase() +
                    selectedRegistration?.status.slice(1)}
                </Badge>
              </div>

              {/* Customer Details */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  CUSTOMER INFORMATION
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    <span>
                      {selectedRegistration?.firstName}{" "}
                      {selectedRegistration?.lastName}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MailIcon className="h-4 w-4 text-gray-500" />
                    <span>{selectedRegistration?.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <PhoneIcon className="h-4 w-4 text-gray-500" />
                    <span>{selectedRegistration?.phone}</span>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h3 className="text-sm font-semibold text-gray-500 mb-2">
                  BOOKING DETAILS
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <span>
                      {format(new Date(selectedRegistration?.date), "PPP")}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-500" />
                    <span>Location: {selectedRegistration?.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CarIcon className="h-4 w-4 text-gray-500" />
                    <span>Vehicle: {selectedRegistration?.vehicle}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPinIcon className="h-4 w-4 text-gray-500" />
                    <span>Address: {selectedRegistration?.address}</span>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              {selectedRegistration?.additionalInfo && (
                <div className="p-3 bg-gray-50 rounded-lg">
                  <h3 className="text-sm font-semibold text-gray-500 mb-2">
                    ADDITIONAL INFORMATION
                  </h3>
                  <div className="flex items-start gap-2">
                    <InfoIcon className="h-4 w-4 text-gray-500 mt-1" />
                    <span>{selectedRegistration?.additionalInfo}</span>
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
