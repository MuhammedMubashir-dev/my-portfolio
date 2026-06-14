from pathlib import Path

from docx import Document
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Inches, Pt, RGBColor


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "muhammed-mubashir-resume.docx"

INK = RGBColor(20, 22, 18)
MUTED = RGBColor(84, 82, 75)
ACCENT = RGBColor(255, 122, 47)
BORDER = "D8D4CA"


def set_run(run, size=10, bold=False, color=INK):
    run.font.name = "Arial"
    run._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    run._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.color.rgb = color


def paragraph_border_bottom(paragraph, color=BORDER, size="8"):
    p_pr = paragraph._p.get_or_add_pPr()
    p_bdr = p_pr.find(qn("w:pBdr"))
    if p_bdr is None:
        p_bdr = OxmlElement("w:pBdr")
        p_pr.append(p_bdr)

    bottom = OxmlElement("w:bottom")
    bottom.set(qn("w:val"), "single")
    bottom.set(qn("w:sz"), size)
    bottom.set(qn("w:space"), "4")
    bottom.set(qn("w:color"), color)
    p_bdr.append(bottom)


def add_hyperlink(paragraph, text, url, size=9.5, color=ACCENT):
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
    font_el.set(qn("w:ascii"), "Arial")
    font_el.set(qn("w:hAnsi"), "Arial")
    r_pr.append(font_el)

    new_run.append(r_pr)
    text_el = OxmlElement("w:t")
    text_el.text = text
    new_run.append(text_el)
    hyperlink.append(new_run)
    paragraph._p.append(hyperlink)


def add_section_heading(doc, title):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(8)
    p.paragraph_format.space_after = Pt(5)
    paragraph_border_bottom(p, color="E1DDD3", size="6")
    run = p.add_run(title.upper())
    set_run(run, size=10.5, bold=True, color=ACCENT)
    return p


def add_body_paragraph(doc, text, after=4):
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(after)
    p.paragraph_format.line_spacing = 1.12
    run = p.add_run(text)
    set_run(run, size=9.4, color=INK)
    return p


def add_bullet(doc, text):
    p = doc.add_paragraph(style="List Bullet")
    p.paragraph_format.left_indent = Inches(0.18)
    p.paragraph_format.first_line_indent = Inches(-0.18)
    p.paragraph_format.space_after = Pt(2)
    p.paragraph_format.line_spacing = 1.08
    run = p.add_run(text)
    set_run(run, size=9.1, color=INK)
    return p


def add_role_header(doc, title, meta):
    p = doc.add_paragraph()
    p.paragraph_format.space_before = Pt(2)
    p.paragraph_format.space_after = Pt(2)
    left = p.add_run(title)
    set_run(left, size=10.2, bold=True, color=INK)
    p.add_run("  |  ")
    right = p.add_run(meta)
    set_run(right, size=9.2, color=MUTED)
    return p


def build():
    doc = Document()
    section = doc.sections[0]
    section.top_margin = Inches(0.58)
    section.bottom_margin = Inches(0.55)
    section.left_margin = Inches(0.62)
    section.right_margin = Inches(0.62)

    styles = doc.styles
    styles["Normal"].font.name = "Arial"
    styles["Normal"]._element.rPr.rFonts.set(qn("w:ascii"), "Arial")
    styles["Normal"]._element.rPr.rFonts.set(qn("w:hAnsi"), "Arial")
    styles["Normal"].font.size = Pt(9.4)

    title = doc.add_paragraph()
    title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    title.paragraph_format.space_after = Pt(1)
    name = title.add_run("MUHAMMED MUBASHIR")
    set_run(name, size=18.5, bold=True, color=INK)

    subtitle = doc.add_paragraph()
    subtitle.alignment = WD_ALIGN_PARAGRAPH.CENTER
    subtitle.paragraph_format.space_after = Pt(4)
    sub = subtitle.add_run(
        "Product Engineer | React • Next.js • Flutter • API Integrations"
    )
    set_run(sub, size=9.5, bold=True, color=MUTED)
    contact = doc.add_paragraph()
    contact.alignment = WD_ALIGN_PARAGRAPH.CENTER
    contact.paragraph_format.space_after = Pt(8)
    set_run(contact.add_run("Kerala, India | "), size=9.2, color=MUTED)
    add_hyperlink(contact, "muhammedmubashir720@gmail.com", "mailto:muhammedmubashir720@gmail.com")
    set_run(contact.add_run(" | +91 8089433955 | "), size=9.2, color=MUTED)
    add_hyperlink(contact, "github.com/MuhammedMubashir-dev", "https://github.com/MuhammedMubashir-dev")
    set_run(contact.add_run(" | "), size=9.2, color=MUTED)
    add_hyperlink(contact, "linkedin.com/in/muhammed-mubashir-dev", "https://linkedin.com/in/muhammed-mubashir-dev")

    add_section_heading(doc, "Summary")
    add_body_paragraph(
        doc,
        "Product Engineer with hands-on experience building and maintaining production web and mobile "
        "applications using React, Next.js, Flutter, and REST APIs. Experienced in feature development, "
        "API integrations, multi-tenant commerce platforms, localization, theme systems, and resolving "
        "real-world production issues across customer-facing products.",
    )

    add_section_heading(doc, "Experience")
    add_role_header(doc, "ENKE Consulting Services", "Developer - Current, 3rd month")
    for item in [
        "Building and improving React, Next.js, and Flutter product features for real client-facing applications.",
        "Integrating REST APIs and debugging live workflows across commerce, mobile, search, checkout, and business modules.",
        "Fixing production issues involving UI states, filtering logic, validation, timezone behavior, and API response handling.",
        "Contributing to reusable frontend components, responsive interfaces, and practical product improvements.",
    ]:
        add_bullet(doc, item)

    add_section_heading(doc, "Selected Projects")
    projects = [
        (
            "FUNZCART",
            "Multi-Tenant Commerce Platform",
            "Designed category-driven dynamic property filter architecture, implemented multi-select filtering workflows, built customer review editing functionality with image uploads, enhanced search and product discovery with Algolia integration, developed reusable components across themes, and collaborated with backend teams on API contracts.",
        ),
        (
            "Ganvin",
            "Logistics & Delivery Application",
            "Implemented Google Maps navigation integration, developed user location management workflows, built infinite scroll pagination for operational screens, integrated and validated delivery-related APIs, resolved timezone-related backend inconsistencies, and improved pickup and delivery user experiences.",
        ),
        (
            "Juice World",
            "Production Storefront Platform",
            "Integrated banner, products, services, testimonials, and CMS APIs, implemented Incremental Static Regeneration (ISR), added multilingual support with Arabic localization and RTL layout, configured SEO metadata and sitemap generation, built dynamic product listing and detail experiences, and optimized image rendering and application performance.",
        ),
        (
            "CloudPOSWeb",
            "Enterprise Commerce Platform",
            "Implemented tenant onboarding workflows and KV-based tenant switching mechanisms, integrated Razorpay payment gateway, enhanced authentication and customer profile experiences, improved checkout and order placement workflows, implemented multilingual storefront experiences with translation support, built and maintained multiple themes (Aurora, Nova, Toy, Silk, Ornament), and implemented ERP-driven product experiences.",
        ),
    ]
    for name, kind, detail in projects:
        add_role_header(doc, name, kind)
        add_body_paragraph(doc, detail, after=3)

    add_section_heading(doc, "Skills")
    skills = [
        ("Frontend", "React.js, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS"),
        ("Mobile", "Flutter, Dart"),
        ("API Integration", "REST APIs, API Integration, Authentication, Pagination, Postman, API Debugging, Bearer Token Authentication"),
        ("Commerce Platforms", "Product Search, Dynamic Filters, Shopping Cart, Checkout Flows, Order Management, Customer Profiles, Review Systems"),
        ("Payments & Integrations", "Razorpay, ERP Integration, Google Maps, WhatsApp Notifications, Algolia Search"),
        ("Multi-Tenant & Themes", "Theme Architecture, Tenant Onboarding, KV-Based Tenant Switching, Aurora Theme, Nova Theme, Toy Theme, Silk Theme, Ornament Theme"),
        ("Localization & SEO", "Internationalization (i18n), RTL Support, SEO Metadata, Sitemap Generation, ISR, Image Optimization"),
        ("Product Engineering", "Bug Fixing, Code Refactoring, Production Debugging, Responsive UI, Performance Optimization, Feature Development, Cross-Team Collaboration"),
        ("Tools", "Git, GitHub, VS Code, Postman"),
    ]
    for label, value in skills:
        p = doc.add_paragraph()
        p.paragraph_format.space_after = Pt(2)
        label_run = p.add_run(f"{label}: ")
        set_run(label_run, size=9.2, bold=True, color=INK)
        value_run = p.add_run(value)
        set_run(value_run, size=9.2, color=MUTED)

    add_section_heading(doc, "Impact Snapshot")
    add_body_paragraph(
        doc,
        "4+ Live Products | 15+ API Integrations | 60+ Production Fixes | 6+ Storefront Themes",
        after=0,
    )

    OUT.parent.mkdir(parents=True, exist_ok=True)
    doc.save(OUT)
    print(OUT)


if __name__ == "__main__":
    build()
