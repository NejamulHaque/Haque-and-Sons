"use client";

import React, { useState } from "react";
import { ExternalLink, Copy, Check, Share2, Sparkles, Code2, Globe } from "lucide-react";

interface VerifyCredentialActionsProps {
  certId: string;
  studentName: string;
  domain: string;
  issueDate: string | Date;
}

export function VerifyCredentialActions({
  certId,
  studentName,
  domain,
  issueDate,
}: VerifyCredentialActionsProps) {
  const [copiedBadge, setCopiedBadge] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const certDate = new Date(issueDate);
  const issueYear = certDate.getFullYear();
  const issueMonth = certDate.getMonth() + 1;

  const currentOrigin = typeof window !== "undefined" ? window.location.origin : "https://haqueandsons.vercel.app";
  const certUrl = `${currentOrigin}/verify/${certId}`;
  const badgeUrl = `${currentOrigin}/api/badges/${certId}`;
  const badgeMarkdown = `[![Haque & Sons Certified: ${domain}](${badgeUrl})](${certUrl})`;

  // Official LinkedIn Add-to-Profile URL format
  const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(
    `Haque & Sons Certified: ${domain}`
  )}&organizationName=${encodeURIComponent(
    "Haque & Sons"
  )}&issueYear=${issueYear}&issueMonth=${issueMonth}&certUrl=${encodeURIComponent(
    certUrl
  )}&certId=${encodeURIComponent(certId)}`;

  const handleCopyBadge = () => {
    navigator.clipboard.writeText(badgeMarkdown);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 3000);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(certUrl);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 3000);
  };

  return (
    <div className="rounded-2xl bg-white/[0.03] border border-white/10 p-5 backdrop-blur-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div>
          <h3 className="text-sm font-bold text-white tracking-tight flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Social Credential &amp; Portfolio Verification</span>
          </h3>
          <p className="text-xs text-gray-400">
            Publish this verified credential to LinkedIn or embed the live dynamic badge in your GitHub repository.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyUrl}
            className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
          >
            {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedUrl ? "Link Copied!" : "Share Link"}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1-Click LinkedIn Integration */}
        <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/20 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-[#0077B5] text-white flex items-center justify-center font-bold text-xs">
                in
              </div>
              <h4 className="text-xs font-bold text-white">Add to LinkedIn Profile</h4>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Instantly showcase your verified <strong>{domain}</strong> certification on your public LinkedIn profile under Licenses &amp; Certifications.
            </p>
          </div>

          <a
            href={linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2 px-3 rounded-xl bg-[#0077B5] hover:bg-[#006097] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-md"
          >
            <span>Add Certificate to LinkedIn</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* GitHub Dynamic Badge Embed */}
        <div className="p-4 rounded-xl bg-gray-900/40 border border-white/10 space-y-3 flex flex-col justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-cyan-400" />
              <h4 className="text-xs font-bold text-white">GitHub README Dynamic Badge</h4>
            </div>
            <p className="text-[11px] text-gray-400 leading-relaxed">
              Embed a real-time verified SVG badge directly at the top of your GitHub capstone project repository.
            </p>
          </div>

          <button
            onClick={handleCopyBadge}
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {copiedBadge ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedBadge ? "Markdown Snippet Copied!" : "Copy GitHub Badge Markdown"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
