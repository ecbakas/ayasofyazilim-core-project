"use client";
import Issueform from "@repo/ayasofyazilim-ui/molecules/issue-form";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/sonner";
import type { Tag } from "node_modules/@repo/ayasofyazilim-ui/src/molecules/issue-form/type";
import { getTagById } from "../actions";

export default function Page({
  params,
}: {
  params: { id: string };
}): JSX.Element {
  const [tagState, setTag] = useState<Tag>();
  useEffect(() => {
    async function getTagByIdLocal() {
      const tag = await getTagById({ id: params.id });
      if (tag.type === "success") {
        setTag({
          Id: tag.data.id || "",
          Summary: {
            ExpireDate: tag.data.expireDate || "",
            IssuedDate: tag.data.issueDate || "",
            Status: Number(tag.data.status || ""),
            Tag: tag.data.id || "",
            RefundMethod: Number(tag.data.refundType || ""),
          },
          Traveller: {
            Name: tag.data.traveller?.firstname || "",
            Surname: tag.data.traveller?.lastname || "",
            CountryOfResidence: tag.data.traveller?.countryOfResidence || "",
            CountryOfResidenceCode: Number(
              tag.data.traveller?.countryOfResidence || "",
            ),
            Id: tag.data.traveller?.id || "",
            Nationality: tag.data.traveller?.nationality || "",
            NationalityCode: Number(tag.data.traveller?.nationality || ""),
            TravelDocumentNumber:
              tag.data.traveller?.travelDocumentNumber || "",
          },
          ExportValidation: {
            ExportDate: tag.data.exportValidation?.date || "",
            ExportLocation: Number(tag.data.exportValidation?.endpointId || ""),
            Id: tag.data.id || "",
            StampType: Number(tag.data.exportValidation?.stampType || ""),
          },
          Invoices: [],
          Invoicing: {
            Id: tag.data.billing?.id || "",
            InvoicingDate: tag.data.billing?.billingDate || "",
            InvoicingNumber: tag.data.billing?.billingNumber || "",
            InvoicingStatus: Number(tag.data.billing?.status || ""),
          },
          Refund: {
            Id: tag.data.refund?.id || "",
            PaidDate: tag.data.refund?.paidDate || "",
            RefundLocation: {
              ID: "Soon",
              Name: "Soon",
            },
            RefundMethod: Number(tag.data.refund?.refundMethod || 0),
            Status: tag.data.refund?.status || 0,
            SubmissionDate: tag.data.refund?.submissionDate || "",
          },
          Earnings: [
            {
              Amount: 210,
              Description: "Exported Tax (JSON)",
            },
            {
              Amount: 110,
              Description: "Paid Tax (JSON)",
            },
          ],
          Merchant: {
            Address: {
              FullText: tag.data.merchant?.address?.fullText || "",
              Id: tag.data.merchant?.id || "",
            },
            Id: tag.data.merchant?.id || "",
            Name: tag.data.merchant?.name || "",
            ProductGroups:
              tag.data.merchant?.productGroups?.map((productGroup) => ({
                Description: productGroup.description || "",
                Id: productGroup.id || "",
              })) || [],
          },
          Totals:
            tag.data.totals?.map((total) => ({
              Amount: Number(total.amount || 0),
              Description: total.totalType || "",
            })) || [],
          Trip: {
            Id: "TR12345", // TODO
            VisitingDate: "2024-08-01", // TODO
            DepartureDate: "2024-08-05", // TODO
            FlightNumber: "FL1234",
            DepartingAirport: {
              Id: "DA001", // TODO
              Name: "Departing Airport Name",
            },
            DestinationAirport: {
              Id: "DA002", // TODO
              Name: "Destination Airport Name",
            },
          },
        });
        return;
      }
      toast.error(`${tag.type} ${tag.message}`);
    }
    void getTagByIdLocal();
  }, []);

  return tagState ? <Issueform tag={tagState} /> : <div>Loading...</div>;
}
