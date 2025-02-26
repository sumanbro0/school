"use client";
import React, { useEffect } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  MapPin,
  Mail,
  School,
  ArrowUpDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetRegistrations } from "@/server/registration";
import { useRouter } from "next/navigation";
import { parseAsInteger, useQueryState } from "nuqs";

const AdmissionList = () => {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const { data, error, isLoading, refetch, isRefetching } = useGetRegistrations(
    { page }
  );

  useEffect(() => {
    refetch();
  }, [page, refetch]);

  const router = useRouter();
  if (isLoading || isRefetching) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="relative">
          <div className="h-16 w-16 rounded-full border-4 border-gray-200 animate-pulse"></div>
          <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-t-4 border-primary animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="text-red-500 bg-red-50 p-4 rounded-full">
          <svg
            className="h-12 w-12"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>
        <p className="text-lg font-medium text-gray-900">
          Failed to load enquiries
        </p>
        <p className="text-gray-500">Please try again later</p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">
            Student Registrations
          </h2>
          <p className="text-gray-500 mt-1">Manage and review registrations</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Page {page}
          </Badge>
          <p className="text-sm text-gray-500">
            Total Entries: {data?.total || 0}
          </p>
        </div>
      </div>

      <div className="rounded-md ">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Student Name</span>
                  <ArrowUpDown className="h-4 w-4" />
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <School className="h-4 w-4" />
                  <span>Grade</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Parent Name</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <span>Contact</span>
                </div>
              </TableHead>
              <TableHead>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Location</span>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.admissions?.map((admission) => (
              <TableRow
                onClick={() =>
                  router.push(`/dashboard/admissions/${admission.id}`)
                }
                key={admission.id}
                className="cursor-pointer hover:bg-muted/50"
              >
                <TableCell className="font-medium">
                  {admission.firstName} {admission.lastName}
                </TableCell>
                <TableCell>Grade {admission.class}</TableCell>
                <TableCell>{admission.guardianName}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{admission.guardianPhone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{admission.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{admission.guardianAddress}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between pt-8">
          <p className="text-sm text-gray-500">
            Showing {data?.admissions?.length || 0} of {data?.total || 0}{" "}
            entries
          </p>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={async () =>
                await setPage((prev) => Math.max(prev - 1, 1))
              }
              disabled={page === 1}
              className="w-32"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={async () => await setPage((prev) => prev + 1)}
              disabled={!data?.hasNextPage}
              className="w-32"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionList;
