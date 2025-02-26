import React from "react";
import { getRegistrationDetail } from "@/actions/get-school";
import AdmissionDetailCards from "@/components/home/server-components/admission-detail-card";
import BackButton from "@/components/back-button";

const AdmissionDetailPage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const admission = await getRegistrationDetail(Number(id));

  if (!admission) {
    return (
      <div className="container mx-auto px-4 py-10">
        <div className="rounded-lg border bg-white p-8 shadow-md text-center">
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Not Found</h2>
          <p className="text-gray-500">Admission record not found</p>
          <BackButton />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center">
          <BackButton />
        </div>
        <div className="text-sm text-gray-500 hidden md:block">
          ID: {admission.id} • Created:{" "}
          {new Date(admission.createdAt || "").toLocaleDateString()}
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-1">
          {admission.firstName} {admission.lastName || ""}
        </h1>
        <p className="text-blue-600 font-medium">Class: {admission.class}</p>
      </div>

      <AdmissionDetailCards admission={admission} />

      <div className="mt-8 text-right text-sm text-gray-500">
        <p>Created: {new Date(admission.createdAt || "").toLocaleString()}</p>
        <p>
          Last updated: {new Date(admission.updatedAt || "").toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default AdmissionDetailPage;
