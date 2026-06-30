"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import PortalGuard from "../../PortalGuard";
import { ROLES } from "@/utils/roles";
import Axios from "@/utils/Axios";
import AxiosToastError from "@/utils/AxiosToastError";
import { SummeryApi } from "@/app/common/SummeryApi";

const money = (n: number) => `$${(n ?? 0).toFixed(2)}`;
const statusColor: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-600",
  SENT: "bg-blue-100 text-blue-700",
  CONVERTED: "bg-green-100 text-green-700",
};

function HistoryInner() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    Axios({ ...SummeryApi.getMyQuotes })
      .then((res) => res.data?.success && setQuotes(res.data.data || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const act = async (api: any, data: any, msg: string, id: string) => {
    try {
      setBusyId(id);
      const res = await Axios({ ...api, data });
      if (res.data?.success) {
        toast.success(msg);
        load();
      }
    } catch (e) {
      AxiosToastError(e);
    } finally {
      setBusyId(null);
    }
  };

  return (
    <div className="p-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gray-500">NDIS Coordinator</p>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-4xl text-gray-900 mt-1">Quote history</h1>
        <button
          onClick={() => router.push("/portal/ndis")}
          className="px-5 py-2.5 rounded-full text-sm font-semibold bg-[#2f7d6f] text-white hover:bg-[#27675b]"
        >
          + New quote 
        </button>
      </div>

      {loading ? (
        <p className="text-gray-400">Loading…</p>
      ) : quotes.length === 0 ? (
        <p className="text-gray-400">No quotes yet.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                <th className="text-left px-4 py-3">Quote</th>
                <th className="text-left px-4 py-3">Participant</th>
                <th className="text-left px-4 py-3">Period</th>
                <th className="text-right px-4 py-3">Total</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.map((q) => (
                <tr key={q.id} className="border-t border-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-800">{q.quoteNumber}</td>
                  <td className="px-4 py-3 text-gray-500">{q.participantRef || "—"}</td>
                  <td className="px-4 py-3 text-gray-500">{q.supplyPeriod}</td>
                  <td className="px-4 py-3 text-right">{money(q.total)}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[11px] px-2.5 py-1 rounded-full font-medium ${statusColor[q.status] ?? "bg-gray-100"}`}>
                      {q.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right whitespace-nowrap">
                    <button
                      disabled={busyId === q.id}
                      onClick={() => act(SummeryApi.emailQuote, { id: q.id }, "Quote emailed", q.id)}
                      className="text-[#2f7d6f] hover:underline text-xs mr-3"
                    >
                      Email
                    </button>
                    <button
                      disabled={busyId === q.id}
                      onClick={() => act(SummeryApi.duplicateQuote, { id: q.id }, "Duplicated", q.id)}
                      className="text-gray-500 hover:underline text-xs mr-3"
                    >
                      Duplicate
                    </button>
                    {q.status !== "CONVERTED" && (
                      <button
                        disabled={busyId === q.id}
                        onClick={() => act(SummeryApi.convertQuoteToOrder, { id: q.id }, "Converted to order", q.id)}
                        className="text-green-600 hover:underline text-xs"
                      >
                        Convert
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function NdisHistoryPage() {
  return (
    <PortalGuard allow={[ROLES.NDIS_COORDINATOR, ROLES.ADMIN]}>
      <HistoryInner />
    </PortalGuard>
  );
}