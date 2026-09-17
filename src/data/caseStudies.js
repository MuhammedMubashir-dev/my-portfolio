// Summaries supported by the ENKE timesheet and project Git history.
export const caseStudies = {
  6: {
    title: "Reducing duplicate requests in My Orders",
    sections: [
      { heading: "The problem", text: "The Customer app fetched active and past orders repeatedly: the parent screen requested counts, while each list requested the same data separately for its content and count. Across both lists, this produced six API calls." },
      { heading: "My contribution", text: "I refactored the Flutter order-loading flow so each list could use one response for both its displayed orders and its Provider-backed count." },
      { heading: "The solution", text: "I removed the redundant requests from the parent screen and reused each list's existing response to update its count. This reduced the combined active and past order requests from six to two." },
      { heading: "Evidence and scope", text: "Commit 4d51aaa records the change across the parent, active-order, and past-order screens. The before-and-after code supports the request-count reduction; it does not establish a measured loading-time improvement." },
    ],
  },
  5: {
    title: "Getting bilingual receipts ready for the counter",
    sections: [
      { heading: "The problem", text: "Retail receipts needed readable English and Arabic output. USB printing issues, unwanted English prefixes, and inconsistent totals and image layouts affected the receipt workflow." },
      { heading: "My contribution", text: "I worked on the Flutter receipt layouts and printing fixes in EPOSMOB, including the Supermarket 2 bilingual receipt and related reporting output." },
      { heading: "The solution", text: "I added the bilingual layout, corrected English prefix stripping, reorganized totals into three columns, and fixed single-image rendering and USB receipt printing issues. Later work addressed English/Arabic PDF invoice rendering and RTL shaping." },
      { heading: "How I verified it", text: "I tested receipt generation and printing after the changes and checked the bilingual formatting and totals layout. I also performed UI and functional checks around the updated receipt workflow." },
    ],
  },
  2: {
    title: "Making delivery lists load and filter reliably",
    sections: [
      { heading: "The problem", text: "Ganvin Executive's delivery lists returned inconsistent results for date filters. Some requests ignored the filter, while today's orders could disappear because of a backend timezone mismatch. Each delivery stage also needed its own pagination state." },
      { heading: "My contribution", text: "I implemented the Flutter-side API filtering and infinite scrolling for Ready to Pick, Picked, Delivery, and Delivered lists, and investigated the unexpected API responses with the backend team." },
      { heading: "The solution", text: "I passed date_filter and per_page explicitly and maintained separate page, loading, and hasMore state for each list. I used an explicit all filter to fix the My Jobs empty state and traced the today-filter issue to server timestamps so the backend correction could be coordinated." },
      { heading: "How I verified it", text: "I tested the authenticated endpoints in Postman with today, week, month, and all filters, compared the returned records, and shared an updated Executive app build for senior review. The investigation distinguished client-side filter handling from the server-side date issue." },
    ],
  },
}
