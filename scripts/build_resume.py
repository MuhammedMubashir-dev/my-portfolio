import sys
from datetime import date
from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"

INK = RGBColor(0, 0, 0)
MUTED = RGBColor(45, 45, 45)
HEADING = RGBColor(0, 0, 0)
LINK = RGBColor(0, 0, 0)

ROLE_START = date(2026, 4, 1)
PROMOTION_DATE = date(2026, 7, 1)

VARIANTS = {
    "flutter": {
        "file": "muhammed-mubashir-k-resume-flutter.docx",
        "subtitle": "Flutter Developer | Dart | Android | iOS | REST APIs",
        "summary": (
            "Flutter Developer with production experience building cross-platform Android and iOS "
            "applications for mobile POS, inventory management, logistics, and e-commerce products. "
            "Delivered billing, purchase return, packing, shipping, reporting, bilingual printing, "
            "Arabic and RTL localization, Google Maps, Razorpay payments, push notifications, in-app "
            "updates, and production release fixes. Experienced with REST APIs, responsive UI development, "
            "state management, Git, and collaboration with backend teams."
        ),
        "current_bullets": [
            "Developed Flutter POS workflows for billing, inventory, purchase returns, purchase orders, packing, shipping, Day Close, and stock reporting.",
            "Implemented Arabic localization and RTL layouts across billing, sales, reports, settings, account, supplier, and customer workflows.",
            "Built bilingual receipt and invoice printing, fractional quantity handling, SKU search, and ZATCA-related order failure alerts.",
            "Delivered Flutter logistics features including Google Maps navigation, Razorpay payments, push notifications, pagination, maintenance handling, and in-app updates.",
            "Diagnosed Android and iOS release issues, API edge cases, authentication failures, date handling, and production UI defects.",
        ],
        "trainee_bullets": [
            "Integrated REST APIs for authentication, profiles, product catalogs, orders, checkout, payments, and delivery workflows in Flutter applications.",
            "Built reusable responsive interfaces with pagination, location management, date filters, image handling, and backend-driven data.",
        ],
        "projects": [
            (
                "EPOSMOB",
                "Mobile POS and Inventory Management (Flutter)",
                "Developed billing, inventory, purchase return, packing, shipping, reporting, bilingual "
                "printing, and ZATCA-supporting workflows with broad Arabic localization and RTL support.",
            ),
            (
                "Ganvin",
                "Logistics and Delivery Applications (Flutter)",
                "Built customer and delivery applications with Google Maps navigation, location management, "
                "Razorpay payments, notifications, pagination, in-app updates, and production issue fixes.",
            ),
            (
                "FUNZCART and Luzine Bakes",
                "Mobile Commerce Features (Flutter and APIs)",
                "Integrated authentication, profiles, product catalogs, carts, checkout, payments, order "
                "workflows, and responsive customer-facing interfaces.",
            ),
        ],
        "skills": [
            ("Flutter Development", "Flutter, Dart, Reusable Widgets, Responsive UI, State Management"),
            ("Mobile Platforms", "Android, iOS, Release Builds, Deep Linking, Push Notifications, In-App Updates"),
            ("Architecture and APIs", "REST APIs, Authentication, JSON, Pagination, Error Handling, Backend Integration"),
            ("Integrations", "Razorpay, Google Maps, Barcode Generation, Bilingual Printing, Arabic Localization, RTL"),
            ("Tools and Databases", "Git, GitHub, Postman, VS Code, Figma, MySQL, SQLite"),
        ],
    },
    "react": {
        "file": "muhammed-mubashir-k-resume-cross-platform.docx",
        "subtitle": "Cross-Platform Mobile and Frontend Developer | Flutter | React Native | React | TypeScript",
        "summary": (
            "Cross-platform mobile and frontend developer with production experience using Flutter, "
            "React Native, React.js, Next.js, TypeScript, JavaScript, and Dart. Delivered Android, iOS, "
            "and web features for POS, logistics, business networking, and e-commerce products. Hands-on "
            "experience includes REST API integration, payments, deep linking, Arabic and RTL localization, "
            "push notifications, maps, invoice printing, responsive interfaces, and production releases."
        ),
        "current_bullets": [
            "Developed Flutter POS workflows for billing, inventory, purchase returns, packing, shipping, Day Close, and bilingual receipt and invoice printing.",
            "Implemented Arabic localization and RTL layouts across core POS, reporting, settings, and account workflows.",
            "Built Flutter logistics features including Google Maps navigation, Razorpay payments, push notifications, pagination, maintenance handling, in-app updates, and release validation.",
            "Developed React Native company profiles, connection and subscription workflows, reCAPTCHA Enterprise, profile sharing, and Branch deferred deep linking across Android and iOS.",
            "Built Next.js e-commerce experiences with multi-tenant theming, Algolia search, dynamic filters, checkout, SSR and ISR caching, SEO metadata, and responsive layouts.",
        ],
        "trainee_bullets": [
            "Integrated REST APIs for authentication, product catalogs, orders, checkout, payments, and user profile workflows across web and mobile applications.",
            "Built reusable responsive components, dynamic product filters, review image uploads, pagination, and API-driven storefront content.",
        ],
        "projects": [
            (
                "FUNZCART / CloudPOS Web",
                "Multi-Tenant E-Commerce Platform (Next.js)",
                "Built a multi-tenant Next.js platform with 8+ production theme packs. Implemented "
                "Algolia search, category-driven filters, reviews with image uploads, responsive checkout, "
                "OTP verification, Razorpay payments, and WhatsApp order notifications.",
            ),
            (
                "Connect App",
                "Business Networking Application (React Native)",
                "Built company profiles, connection requests, subscriptions, shareable URLs, reCAPTCHA "
                "Enterprise, and reliable Branch deferred deep links for Android and iOS.",
            ),
            (
                "EPOSMOB",
                "Mobile POS & Inventory Management (Flutter)",
                "Developed billing, inventory, purchase return, packing, shipping, reporting, and bilingual "
                "printing features. Added Arabic localization and RTL support across core workflows.",
            ),
        ],
        "skills": [
            ("Mobile Development", "Flutter, Dart, React Native, TypeScript, Android, iOS, Deep Linking, Push Notifications"),
            ("Frontend Development", "React.js, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS, Responsive Design"),
            ("Architecture and APIs", "REST APIs, SSR, ISR, Dynamic Routing, Multi-Tenant Architecture, State Management, i18n, RTL"),
            ("Integrations", "Razorpay, Algolia Search, Google Maps, reCAPTCHA Enterprise, WhatsApp Notifications, Barcode Generation"),
            ("Tools and Databases", "Git, GitHub, Postman, Figma, MySQL, SQLite, Python, Django"),
        ],
    },
    "react-native": {
        "file": "muhammed-mubashir-k-resume-react-native.docx",
        "subtitle": "React Native Developer | TypeScript | JavaScript | Android | iOS",
        "summary": (
            "React Native Developer with production experience building Android and iOS features using "
            "TypeScript and JavaScript. Delivered company profiles, connection and subscription workflows, "
            "reCAPTCHA Enterprise, image handling, shareable URLs, and Branch deferred deep linking. Skilled "
            "in REST APIs, responsive UI, release troubleshooting, React.js, Next.js, and Flutter."
        ),
        "current_bullets": [
            "Developed a React Native business networking application with company profiles, connections, subscriptions, navigation, authentication, and REST APIs.",
            "Implemented Branch NativeLink, deferred deep linking, shareable profile URLs, and reliable link handling across Android and iOS release flows.",
            "Integrated reCAPTCHA Enterprise, API-driven social platforms, image handling, and username synchronization; resolved mobile build and release issues.",
            "Built React.js and Next.js commerce features including multi-tenant themes, search, filters, checkout, payments, SSR, ISR, and responsive UI.",
        ],
        "trainee_bullets": [
            "Integrated APIs and built reusable responsive components for authentication, profiles, products, orders, checkout, payments, image uploads, and pagination.",
        ],
        "projects": [
            (
                "Connect App",
                "Business Networking Application (React Native)",
                "Built profiles, connections, subscriptions, reCAPTCHA Enterprise, image handling, shareable "
                "URLs, and Branch deferred deep links for Android and iOS.",
            ),
            (
                "FUNZCART / CloudPOS Web",
                "Multi-Tenant E-Commerce Platform (Next.js)",
                "Built 8+ Next.js theme packs with Algolia search, dynamic filters, responsive checkout, "
                "Razorpay payments, and API-driven content.",
            ),
            (
                "EPOSMOB",
                "Mobile POS & Inventory Management (Flutter)",
                "Developed Flutter billing, inventory, purchase return, packing, shipping, bilingual printing, "
                "and Arabic and RTL localization features.",
            ),
        ],
        "skills": [
            ("React Native Development", "React Native, TypeScript, JavaScript, Responsive UI, State Management"),
            ("Mobile Platforms", "Android, iOS, Branch NativeLink, Deferred Deep Linking, Release Builds"),
            ("React Ecosystem", "React.js, Next.js, HTML5, CSS3, Tailwind CSS, SSR, ISR"),
            ("Architecture and APIs", "REST APIs, Authentication, JSON, Pagination, Error Handling, Multi-Tenant Architecture"),
            ("Integrations and Tools", "reCAPTCHA Enterprise, Razorpay, Algolia, Git, GitHub, Postman, Figma"),
            ("Additional Experience", "Flutter, Dart, Arabic Localization, RTL, Google Maps, Push Notifications"),
        ],
    },
    "frontend": {
        "file": "muhammed-mubashir-k-resume-frontend.docx",
        "subtitle": "Frontend Developer  |  React.js · Next.js · TypeScript · Tailwind CSS",
        "summary": (
            "Frontend Developer with production experience building responsive, performant web "
            "applications using React.js, Next.js, and TypeScript. Delivered 8+ theme packs for a "
            "multi-tenant e-commerce platform, bilingual (English/Arabic) storefronts with RTL support, "
            "and complex search, filtering, and checkout UIs. Skilled in SSR/ISR optimization, "
            "component architecture, and responsive design across devices. Also experienced in "
            "React Native and Flutter for mobile development."
        ),
        "current_bullets": [
            "Engineered a multi-tenant Next.js e-commerce platform with 8+ production theme packs, reusable component architecture, and tenant-specific UI experiences across live client storefronts.",
            "Built live search autocomplete with debounced requests and request cancellation, integrated across multiple theme navigation bars with Algolia-powered product discovery.",
            "Delivered bilingual (English/Arabic) storefronts with full RTL layout support, i18n translation systems, ISR caching, and dynamic SEO metadata with sitemap generation.",
            "Designed category-driven dynamic property filter architecture with multi-select filtering, responsive UI, and a review system supporting multi-image uploads.",
            "Integrated Razorpay payment gateway across tenant checkouts; built OTP authentication, guest checkout, and COD flows with WhatsApp order notifications.",
            "Also developed React Native and Flutter applications for business networking, POS, and logistics, including deep-link reliability, Arabic/RTL localization, payments, and release validation.",
        ],
        "trainee_bullets": [
            "Integrated REST APIs for authentication, product catalogs, orders, and checkout across Next.js storefronts with responsive, theme-consistent UI.",
            "Built reusable UI components shared across 8+ theme packs with consistent styling, spacing, and responsive behavior.",
            "Implemented Google Maps integration, infinite-scroll pagination, and date-based filtering with responsive layouts for mobile screens.",
        ],
        "projects": [
            (
                "FUNZCART / CloudPOS Web",
                "Multi-Tenant E-Commerce Platform (Next.js · Tailwind)",
                "Built and maintained a multi-tenant Next.js platform with 8+ production theme packs "
                "(Aurora, Nova, Toy, Silk, Ornament, Harvest) and tenant storefronts including Luzine "
                "Bakes. Designed dynamic property filter architecture, live search autocomplete, and a "
                "review system with multi-image uploads. Built responsive layouts across all themes.",
            ),
            (
                "Juice World",
                "Production Storefront (Next.js · i18n · ISR)",
                "Developed a production storefront with API-driven banners, products, services, and "
                "testimonials. Implemented English/Arabic i18n with full RTL support, ISR caching, "
                "dynamic SEO metadata, and responsive design across all devices.",
            ),
            (
                "Connect App",
                "Business Networking Application (React Native)",
                "Built a business networking app enabling companies to create and share professional "
                "profiles, manage connection requests, and handle subscriptions. Implemented deep "
                "linking, profile sharing via shortened URLs, group navigation, reCAPTCHA Enterprise, and Android/iOS deferred-link reliability fixes.",
            ),
            (
                "Ganvin",
                "Logistics & Delivery Ecosystem (Flutter)",
                "Built Executive and Customer apps with Google Maps navigation, infinite-scroll "
                "pagination, Razorpay payments, in-app updates, maintenance handling, and responsive mobile layouts.",
            ),
            (
                "EPOSMOB",
                "Mobile POS & Inventory Management (Flutter)",
                "Developed a mobile POS application covering billing, Day Close workflows, bilingual "
                "receipt and invoice printing, stock reports, Purchase Return, packing/shipping, and supplier/customer management with broad Arabic/RTL localization.",
            ),
        ],
        "skills": [
            ("Frontend", "React.js, Next.js, TypeScript, JavaScript, HTML5, CSS3, Tailwind CSS"),
            ("Web Architecture", "SSR, ISR, Dynamic Routing, SEO, Sitemap Generation, i18n, RTL Support, Responsive Design, State Management"),
            ("UI Engineering", "Component Architecture, Multi-Theme Systems, Reusable Components, Responsive Layouts"),
            ("Integrations", "Razorpay, Algolia Search, Google Maps, WhatsApp Notifications, Barcode Generation"),
            ("Commerce & Multi-Tenant", "Multi-Tenant Architecture (8+ themes), Tenant Onboarding, Product Search, Checkout Flows, Order Management"),
            ("Also experienced in", "React Native, Flutter, Dart, Python, Django, MySQL"),
            ("Tools", "Git, GitHub, VS Code, Postman, Figma"),
        ],
    },
}


def months_since(start: date) -> int:
    today = date.today()
    months = (today.year - start.year) * 12 + (today.month - start.month)
    return max(months, 0)


def set_run(run, size=10, bold=False, color=INK):
    run.font.name = "Calibri"
    run._element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
    run._element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color


def ats_text(value):
    return (
        value.replace("–", "-")
        .replace("—", "-")
        .replace("·", "|")
        .replace("’", "'")
    )


def add_hyperlink(paragraph, text, url, size=9.5, color=LINK):
    part = paragraph.part
    r_id = part.relate_to(
        url,
        "http://schemas.openxmlformats.org/officeDocument/2006/relationships/hyperlink",
        is_external=True,
    )
    hyperlink = OxmlElement("w:hyperlink")
    hyperlink.set(qn("r:id"), r_id)
    new_run = OxmlElement("w:r")
    r_pr = OxmlElement("w:rPr")
    color_el = OxmlElement("w:color")
    color_el.set(qn("w:val"), str(color))
    r_pr.append(color_el)
    size_el = OxmlElement("w:sz")
    size_el.set(qn("w:val"), str(int(size * 2)))
    r_pr.append(size_el)
    font_el = OxmlElement("w:rFonts")
    font_el.set(qn("w:ascii"), "Calibri")
    font_el.set(qn("w:hAnsi"), "Calibri")
    r_pr.append(font_el)
    new_run.append(r_pr)
    text_el = OxmlElement("w:t")
    text_el.text = ats_text(text)
    new_run.append(text_el)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)


def add_section_heading(doc, title):
    p = doc.add_paragraph(style="Heading 1")
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(3)
    run = p.add_run(ats_text(title))
    set_run(run, size=11, bold=True, color=HEADING)
    return p


def add_body_paragraph(doc, text, after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing = 1.15
    run = p.add_run(ats_text(text))
    set_run(run, size=10.5, color=INK)
    return p


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent = Inches(0.2)
    p.paragraph_format.first_line_indent = Inches(-0.2)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.12
    run = p.add_run(ats_text(text))
    set_run(run, size=10, color=INK)
    return p


def add_role_header(doc, title, meta):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(3)
    p.paragraph_format.space_after = Pt(2)
    left = p.add_run(ats_text(title))
    set_run(left, size=10.5, bold=True, color=INK)
    sep = p.add_run("  |  ")
    set_run(sep, size=10, color=MUTED)
    right = p.add_run(ats_text(meta))
    set_run(right, size=9.5, color=MUTED)
    return p


def build(variant_key):
    v = VARIANTS[variant_key]
    out = PUBLIC / v["file"]

    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.6)
    section.bottom_margin = Inches(0.6)
    section.left_margin = Inches(0.7)
    section.right_margin = Inches(0.7)

    styles = doc.styles
    styles["Normal"].font.name = "Calibri"
    styles["Normal"]._element.rPr.rFonts.set(qn("w:ascii"), "Calibri")
    styles["Normal"]._element.rPr.rFonts.set(qn("w:hAnsi"), "Calibri")
    styles["Normal"].font.size = Pt(10)

    title = doc.add_paragraph(style="Title")
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_after = Pt(1)
    name = title.add_run("MUHAMMED MUBASHIR K")
    set_run(name, size=18, bold=True, color=HEADING)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle.paragraph_format.space_after = Pt(4)
    sub = subtitle.add_run(ats_text(v["subtitle"]))
    set_run(sub, size=10, bold=False, color=MUTED)

    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    contact.paragraph_format.space_after = Pt(8)
    set_run(contact.add_run("Kerala, India  |  "), size=9.5, color=MUTED)
    add_hyperlink(contact, "muhammedmubashir720@gmail.com", "mailto:muhammedmubashir720@gmail.com")
    set_run(contact.add_run("  |  "), size=9.5, color=MUTED)
    add_hyperlink(contact, "+91 8089433955", "tel:+918089433955")
    set_run(contact.add_run("  |  "), size=9.5, color=MUTED)
    add_hyperlink(contact, "github.com/MuhammedMubashir-dev", "https://github.com/MuhammedMubashir-dev")
    set_run(contact.add_run("  |  "), size=9.5, color=MUTED)
    add_hyperlink(contact, "linkedin.com/in/muhammed-mubashir-k", "https://www.linkedin.com/in/muhammed-mubashir-k")
    set_run(contact.add_run("  |  "), size=9.5, color=MUTED)
    add_hyperlink(contact, "muhammed-mubashir-portfolio.netlify.app", "https://muhammed-mubashir-portfolio.netlify.app")

    add_section_heading(doc, "Professional Summary")
    add_body_paragraph(doc, v["summary"])

    add_section_heading(doc, "Technical Skills")
    for label, value in v["skills"]:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(1)
        label_run = p.add_run(f"{ats_text(label)}: ")
        set_run(label_run, size=10, bold=True, color=INK)
        value_run = p.add_run(ats_text(value))
        set_run(value_run, size=10, color=INK)

    add_section_heading(doc, "Work Experience")
    total_months = months_since(ROLE_START)
    total_dur = f"Apr 2026 - Present | {total_months} mo{'s' if total_months != 1 else ''}"

    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(1)
    company = p.add_run("ENKE Consulting Services LLP")
    set_run(company, size=11, bold=True, color=INK)
    sep = p.add_run(f"  |  {total_dur}")
    set_run(sep, size=9.5, color=MUTED)

    curr_months = months_since(PROMOTION_DATE)
    add_role_header(doc, "Junior Application Developer", f"Jul 2026 - Present | {curr_months} mo{'s' if curr_months != 1 else ''}")
    for item in v["current_bullets"]:
        add_bullet(doc, item)

    add_role_header(doc, "Full Stack Developer Trainee", "Apr 2026 - Jul 2026 | 3 mos")
    for item in v["trainee_bullets"]:
        add_bullet(doc, item)

    add_section_heading(doc, "Education")
    add_role_header(doc, "Bachelor of Computer Applications (BCA)", "2023 - 2026")
    add_body_paragraph(
        doc,
        "Priyadarshini Arts and Science College, Melmuri, Malappuram | University of Calicut",
        after=2,
    )

    add_section_heading(doc, "Projects")
    for name, kind, detail in v["projects"]:
        add_role_header(doc, name, kind)
        add_body_paragraph(doc, detail, after=3)

    out.parent.mkdir(parents=True, exist_ok=True)
    doc.save(out)
    print(out)


if __name__ == "__main__":
    variant = sys.argv[1] if len(sys.argv) > 1 else "react"
    if variant == "all":
        for key in VARIANTS:
            build(key)
    elif variant in VARIANTS:
        build(variant)
    else:
        print(f"Unknown variant: {variant}")
        print(f"Available: {', '.join(VARIANTS.keys())}, all")
        sys.exit(1)
