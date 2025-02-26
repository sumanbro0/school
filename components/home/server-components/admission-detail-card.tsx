"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Calendar,
  Phone,
  Mail,
  MapPin,
  FileText,
  User,
  Users,
  Clipboard,
  School,
  FileCheck,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Admission } from "@/types/school";

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => (
  <div className="flex items-start gap-3">
    <div className="mt-1 text-gray-500 flex-shrink-0">{icon}</div>
    <div className="flex-1">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <div className="text-gray-800">{value}</div>
    </div>
  </div>
);

const AdmissionDetailCards = ({ admission }: { admission: Admission }) => {
  const [showMoreAddress, setShowMoreAddress] = useState(false);
  const [showMoreParents, setShowMoreParents] = useState(false);
  const [showMoreDocs, setShowMoreDocs] = useState(false);

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Student Information Card */}
      <div className="md:col-span-4 rounded-xl border bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col items-center">
          {admission.studentPhotoUrl ? (
            <div className="relative mb-4 h-36 w-36 overflow-hidden rounded-full border-4 border-gray-100 shadow">
              <Image
                src={admission.studentPhotoUrl}
                alt={`${admission.firstName}'s photo`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mb-4 flex h-36 w-36 items-center justify-center rounded-full bg-blue-50 border-4 border-gray-100 shadow">
              <User size={72} className="text-blue-300" />
            </div>
          )}
          <h2 className="text-xl font-semibold text-gray-800">
            {admission.firstName} {admission.lastName || ""}
          </h2>
          <div className="mt-1 inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700">
            <School size={14} className="mr-1" />
            {admission.class}
          </div>
        </div>

        <div className="space-y-4">
          <InfoItem
            icon={<Calendar size={18} />}
            label="Date of Birth"
            value={new Date(admission.dateOfBirth).toLocaleDateString()}
          />

          <InfoItem
            icon={<Users size={18} />}
            label="Gender"
            value={admission.gender}
          />

          {admission.mobileNumber && (
            <InfoItem
              icon={<Phone size={18} />}
              label="Mobile"
              value={admission.mobileNumber}
            />
          )}

          <InfoItem
            icon={<Mail size={18} />}
            label="Email"
            value={<span className="break-words">{admission.email}</span>}
          />

          <div className="pt-2">
            <button
              onClick={() => setShowMoreParents(!showMoreParents)}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Parents Information
              {showMoreParents ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {showMoreParents && (
              <div className="mt-3 space-y-3 pl-1">
                {admission.fatherName && (
                  <InfoItem
                    icon={<User size={18} />}
                    label="Father"
                    value={admission.fatherName}
                  />
                )}
                {admission.motherName && (
                  <InfoItem
                    icon={<User size={18} />}
                    label="Mother"
                    value={admission.motherName}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Guardian Information Card */}
      <div className="md:col-span-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
          Guardian Information
        </h3>

        <div className="mb-6 flex flex-col items-center">
          {admission.guardianPhotoUrl ? (
            <div className="relative mb-3 h-28 w-28 overflow-hidden rounded-full border-4 border-gray-100 shadow">
              <Image
                src={admission.guardianPhotoUrl}
                alt={`${admission.guardianName}'s photo`}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="mb-3 flex h-28 w-28 items-center justify-center rounded-full bg-green-50 border-4 border-gray-100 shadow">
              <User size={56} className="text-green-300" />
            </div>
          )}
          <h4 className="text-lg font-medium text-gray-800">
            {admission.guardianName}
          </h4>
          <div className="mt-1 inline-flex items-center rounded-full bg-green-50 px-3 py-1 text-sm text-green-700">
            {admission.guardianRelation} ({admission.guardianType})
          </div>
        </div>

        <div className="space-y-4">
          {admission.guardianPhone && (
            <InfoItem
              icon={<Phone size={18} />}
              label="Phone"
              value={admission.guardianPhone}
            />
          )}

          {admission.guardianEmail && (
            <InfoItem
              icon={<Mail size={18} />}
              label="Email"
              value={
                <span className="break-words">{admission.guardianEmail}</span>
              }
            />
          )}

          {admission.guardianOccupation && (
            <InfoItem
              icon={<FileText size={18} />}
              label="Occupation"
              value={admission.guardianOccupation}
            />
          )}

          {admission.guardianAddress && (
            <InfoItem
              icon={<MapPin size={18} />}
              label="Address"
              value={admission.guardianAddress}
            />
          )}
        </div>
      </div>

      {/* Additional Information Card */}
      <div className="md:col-span-4 rounded-xl border bg-white p-6 shadow-sm">
        <h3 className="mb-5 border-b pb-3 text-lg font-semibold text-gray-800">
          Additional Information
        </h3>

        <div className="space-y-5">
          <div>
            <button
              onClick={() => setShowMoreAddress(!showMoreAddress)}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Address Information
              {showMoreAddress ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {showMoreAddress && (
              <div className="mt-3 space-y-4 p-2">
                {admission.currentAddress && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Current Address:
                    </p>
                    <p className="mt-1 text-gray-800">
                      {admission.currentAddress}
                    </p>
                  </div>
                )}
                {admission.permanentAddress && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-600">
                      Permanent Address:
                    </p>
                    <p className="mt-1 text-gray-800">
                      {admission.permanentAddress}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div>
            {(admission.nationalIdNumber || admission.localIdNumber) && (
              <>
                <h4 className="font-medium text-gray-700 mb-2">
                  Identification
                </h4>
                <div className="space-y-2 p-2">
                  {admission.nationalIdNumber && (
                    <div className="flex items-center">
                      <Clipboard size={16} className="text-gray-500 mr-2" />
                      <div>
                        <span className="text-sm text-gray-600 mr-2">
                          National ID:
                        </span>
                        <span>{admission.nationalIdNumber}</span>
                      </div>
                    </div>
                  )}
                  {admission.localIdNumber && (
                    <div className="flex items-center">
                      <Clipboard size={16} className="text-gray-500 mr-2" />
                      <div>
                        <span className="text-sm text-gray-600 mr-2">
                          Local ID:
                        </span>
                        <span>{admission.localIdNumber}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          <div>
            <button
              onClick={() => setShowMoreDocs(!showMoreDocs)}
              className="flex w-full items-center justify-between rounded-lg bg-gray-50 px-4 py-2 text-left text-sm font-medium text-gray-700 hover:bg-gray-100"
            >
              Documents & Previous School
              {showMoreDocs ? (
                <ChevronUp size={16} />
              ) : (
                <ChevronDown size={16} />
              )}
            </button>
            {showMoreDocs && (
              <div className="mt-3 space-y-4 p-2">
                {admission.previousSchoolDetails && (
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      Previous School:
                    </p>
                    <p className="mt-1 text-gray-800">
                      {admission.previousSchoolDetails}
                    </p>
                  </div>
                )}

                {admission.documentsUrl && (
                  <div className="mt-2">
                    <a
                      href={admission.documentsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100"
                    >
                      <FileCheck size={16} className="mr-2" />
                      View Documents
                      <ExternalLink size={14} className="ml-2" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdmissionDetailCards;
