import sys
from html import escape
from pathlib import Path

from reportlab.lib.colors import black
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import letter
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import inch
from reportlab.platypus import KeepTogether, Paragraph, SimpleDocTemplate, Spacer

from build_resume import PROMOTION_DATE, ROLE_START, VARIANTS, ats_text, months_since


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_DIR = ROOT / "output" / "pdf"

OUTPUTS = {
    "flutter": "muhammed-mubashir-k-resume-flutter.pdf",
    "react-native": "muhammed-mubashir-k-resume-react-native.pdf",
    "react": "muhammed-mubashir-k-resume-cross-platform.pdf",
}


def safe(value):
    return escape(ats_text(value))


def make_styles():
    base = getSampleStyleSheet()
    return {
        "name": ParagraphStyle(
            "ResumeName",
            parent=base["Title"],
            fontName="Helvetica-Bold",
            fontSize=18,
            leading=20,
            textColor=black,
            alignment=TA_CENTER,
            spaceAfter=2,
        ),
        "title": ParagraphStyle(
            "ResumeTitle",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=9.5,
            leading=11,
            textColor=black,
            alignment=TA_CENTER,
            spaceAfter=3,
        ),
        "contact": ParagraphStyle(
            "ResumeContact",
            parent=base["Normal"],
            fontName="Helvetica",
            fontSize=8.2,
            leading=10,
            textColor=black,
            alignment=TA_CENTER,
            spaceAfter=6,
        ),
        "heading": ParagraphStyle(
            "ResumeHeading",
            parent=base["Heading1"],
            fontName="Helvetica-Bold",
            fontSize=10.5,
            leading=12,
            textColor=black,
            alignment=TA_LEFT,
            spaceBefore=5,
            spaceAfter=2,
            keepWithNext=True,
        ),
        "body": ParagraphStyle(
            "ResumeBody",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.2,
            leading=11.1,
            textColor=black,
            alignment=TA_LEFT,
            spaceAfter=2,
        ),
        "compact": ParagraphStyle(
            "ResumeCompact",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=8.9,
            leading=10.7,
            textColor=black,
            alignment=TA_LEFT,
            spaceAfter=1.5,
        ),
        "bullet": ParagraphStyle(
            "ResumeBullet",
            parent=base["BodyText"],
            fontName="Helvetica",
            fontSize=9.0,
            leading=10.8,
            textColor=black,
            leftIndent=10,
            firstLineIndent=-8,
            spaceAfter=1.5,
        ),
        "label": ParagraphStyle(
            "ResumeLabel",
            parent=base["BodyText"],
            fontName="Helvetica-Bold",
            fontSize=9.3,
            leading=11,
            textColor=black,
            spaceAfter=1,
            keepWithNext=True,
        ),
    }


def add_heading(story, styles, text):
    story.append(Paragraph(safe(text), styles["heading"]))


def add_bullet(story, styles, text):
    story.append(Paragraph(f"- {safe(text)}", styles["bullet"]))


def clickable_contact(styles):
    links = [
        "Kerala, India",
        '<link href="mailto:muhammedmubashir720@gmail.com"><u>muhammedmubashir720@gmail.com</u></link>',
        '<link href="tel:+918089433955"><u>+91 8089433955</u></link>',
        '<link href="https://github.com/MuhammedMubashir-dev"><u>github.com/MuhammedMubashir-dev</u></link>',
        '<link href="https://www.linkedin.com/in/muhammed-mubashir-k"><u>linkedin.com/in/muhammed-mubashir-k</u></link>',
        '<link href="https://muhammed-mubashir-portfolio.netlify.app"><u>muhammed-mubashir-portfolio.netlify.app</u></link>',
    ]
    return Paragraph(" | ".join(links), styles["contact"])


def build_pdf(variant_key):
    variant = VARIANTS[variant_key]
    output = OUTPUT_DIR / OUTPUTS[variant_key]
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    styles = make_styles()

    doc = SimpleDocTemplate(
        str(output),
        pagesize=letter,
        leftMargin=0.62 * inch,
        rightMargin=0.62 * inch,
        topMargin=0.5 * inch,
        bottomMargin=0.5 * inch,
        title=f"Muhammed Mubashir K - {ats_text(variant['subtitle'].split('|')[0].strip())} Resume",
        author="Muhammed Mubashir K",
        subject="ATS-friendly software developer resume",
    )

    story = [
        Paragraph("MUHAMMED MUBASHIR K", styles["name"]),
        Paragraph(safe(variant["subtitle"]), styles["title"]),
        clickable_contact(styles),
    ]

    add_heading(story, styles, "Professional Summary")
    story.append(Paragraph(safe(variant["summary"]), styles["body"]))

    add_heading(story, styles, "Technical Skills")
    for label, value in variant["skills"]:
        story.append(
            Paragraph(f"<b>{safe(label)}:</b> {safe(value)}", styles["compact"])
        )

    add_heading(story, styles, "Work Experience")
    total_months = months_since(ROLE_START)
    current_months = months_since(PROMOTION_DATE)
    story.append(
        Paragraph(
            f"<b>ENKE Consulting Services LLP</b> | Apr 2026 - Present | {total_months} mos",
            styles["label"],
        )
    )
    story.append(
        Paragraph(
            f"<b>Junior Application Developer</b> | Jul 2026 - Present | {current_months} mos",
            styles["compact"],
        )
    )
    for bullet in variant["current_bullets"]:
        add_bullet(story, styles, bullet)

    story.append(
        Paragraph(
            "<b>Full Stack Developer Trainee</b> | Apr 2026 - Jul 2026 | 3 mos",
            styles["compact"],
        )
    )
    for bullet in variant["trainee_bullets"]:
        add_bullet(story, styles, bullet)

    add_heading(story, styles, "Education")
    story.append(
        KeepTogether(
            [
                Paragraph(
                    "<b>Bachelor of Computer Applications (BCA)</b> | 2023 - 2026",
                    styles["label"],
                ),
                Paragraph(
                    "Priyadarshini Arts and Science College, Melmuri, Malappuram | University of Calicut",
                    styles["compact"],
                ),
            ]
        )
    )

    add_heading(story, styles, "Projects")
    for name, kind, detail in variant["projects"]:
        story.append(
            KeepTogether(
                [
                    Paragraph(f"<b>{safe(name)}</b> | {safe(kind)}", styles["label"]),
                    Paragraph(safe(detail), styles["compact"]),
                    Spacer(1, 1),
                ]
            )
        )

    doc.build(story)
    print(output)


if __name__ == "__main__":
    requested = sys.argv[1:] or ["flutter", "react-native", "react"]
    invalid = [key for key in requested if key not in OUTPUTS]
    if invalid:
        raise SystemExit(f"Unknown variants: {', '.join(invalid)}")
    for key in requested:
        build_pdf(key)
