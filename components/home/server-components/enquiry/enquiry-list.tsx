"use client";
import React, { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  User,
  Phone,
  MapPin,
  Mail,
  School,
  Hash,
  ArrowUpDown,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Enquiry } from "@/types/enquery";
import { useGetEnquiries } from "@/server/enquiry";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EnquiryList = () => {
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [page, setPage] = useState(1);
  const { data, error, isLoading } = useGetEnquiries(page);

  if (isLoading) {
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
            Admission Enquiries
          </h2>
          <p className="text-gray-500 mt-1">
            Manage and review student applications
          </p>
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
            {data?.enquiries?.map((enquiry) => (
              <TableRow
                key={enquiry.id}
                className="cursor-pointer hover:bg-muted/50"
                onClick={() => setSelectedEnquiry(enquiry)}
              >
                <TableCell className="font-medium">
                  {enquiry.studentName}
                </TableCell>
                <TableCell>Grade {enquiry.grade}</TableCell>
                <TableCell>{enquiry.parentName}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <span>{enquiry.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <span>{enquiry.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{enquiry.preferredLocation}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex items-center justify-between pt-8">
          <p className="text-sm text-gray-500">
            Showing {data?.enquiries?.length || 0} of {data?.total || 0} entries
          </p>
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="w-32"
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!data?.hasNextPage}
              className="w-32"
            >
              Next
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      <Sheet
        open={!!selectedEnquiry}
        onOpenChange={() => setSelectedEnquiry(null)}
      >
        <SheetContent className="w-full sm:max-w-xl">
          <SheetHeader>
            <SheetTitle className="text-2xl">Enquiry Details</SheetTitle>
          </SheetHeader>
          <ScrollArea className="h-full py-8">
            {selectedEnquiry && (
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <User className="h-5 w-5" />
                    <h3 className="font-medium">Student Information</h3>
                  </div>
                  <div className="p-4 bg-primary/5 rounded-lg">
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-gray-900">
                        {selectedEnquiry.studentName}
                      </p>
                      <p className="text-gray-600">
                        Applying for Grade: {selectedEnquiry.grade}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <User className="h-5 w-5" />
                    <h3 className="font-medium">Parent Information</h3>
                  </div>
                  <div className="p-4 rounded-lg border space-y-3">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">
                        {selectedEnquiry.parentName}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">{selectedEnquiry.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">{selectedEnquiry.phone}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <MapPin className="h-5 w-5" />
                    <h3 className="font-medium">Location Preference</h3>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="text-gray-900">
                      {selectedEnquiry.preferredLocation}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <Hash className="h-5 w-5" />
                    <h3 className="font-medium">Reference</h3>
                  </div>
                  <div className="p-4 rounded-lg border">
                    <p className="font-mono text-sm text-gray-600">
                      {selectedEnquiry.id}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default EnquiryList;
