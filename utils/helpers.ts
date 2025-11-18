
// export function stripHTML(html) {
//     return html.replace(/<[^>]*>/g, '');
// }

import { API_URL } from "@/config/api";

// export function getFirstNWords(text, n = 100) {
//     return text.split(/\s+/).slice(0, n).join(' ');
// }

export function stripHTML(html: string = ""): string {
    return typeof html === "string" ? html.replace(/<[^>]*>/g, "") : "";
}

export function getFirstNWords(text: string = "", n: number = 100): string {
    return typeof text === "string" ? text.split(/\s+/).slice(0, n).join(" ") : "";
}

export function replaceImageSrcDomain(pageDataContent: string) {
    if (!pageDataContent) return pageDataContent;
  
    return pageDataContent.replace(
      /https?:\/\/(www\.)?sringeri\.net\/wp-content/gi,
      'https://www.srisharadapeetham.com/wp-content'
    );
  }

export const getSidebarData = async (mainPageUrl: string) => {
    try {
        const res = await fetch(`${API_URL}sidebars`);
        const parsedRes = await res.json();
        const sidebarData = parsedRes.find(d => d.url.startsWith(mainPageUrl));
        return sidebarData.sidebar;
    } catch(err) {
        console.error(err);
    }
}

// Preprocessing function for Kannada
function iastKa(_text: string): string {
    const consonants = ["k", "g", "c", "j", "ṭ", "ḍ", "t", "d", "p", "b"];
    const nasals = ["ṅ", "ñ", "ṇ", "n", "m"];
    const anusvar = "ṃ";

    let updatedText = _text;

    for (const nasal of nasals) {
        for (const consonant of consonants) {
            const pattern = new RegExp(nasal + consonant, 'g');
            updatedText = updatedText.replace(pattern, anusvar + consonant);
        }
    }

    return updatedText;
}

export function transliterate(text: string, from: string, to: string): string {
  'use client'
  if (typeof window !== "undefined" && window.Sanscript) {
    const avagrahaProcessedText = text.replace(/’/g, "'");
    if (to.toLowerCase() === 'kannada' || to.toLowerCase() === 'gujarati' || to.toLowerCase() === 'telugu') {
      // Convert to IAST first if needed. It is not needed but still converting for safety 
      const iastText = from.toLowerCase() === 'iast' 
        ? avagrahaProcessedText 
        : window.Sanscript.t(avagrahaProcessedText, from, 'iast');
      
      // use iastKa function to process iast text to handle kannada's edge cases
      const processedText = iastKa(iastText);
      
      // Convert to Kannada
      return window.Sanscript.t(processedText, 'iast', to);
    }
    
    // Standard transliteration for other languages
    return window.Sanscript.t(avagrahaProcessedText, from, to);
  }
  return ""; // fallback if Sanscript not loaded
}

export function wrapYouTubeIframes(html: string): string {
    return html.replace(/<iframe class="ql-video"[^>]*src="([^"]+)"[^>]*><\/iframe>/g, (_, src) => {
        return `
        <div class="relative w-full overflow-hidden rounded-lg shadow-lg">
          <div class="relative w-full pb-[56.25%]">
            <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="${src}"
              title="YouTube Video"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>`;
    });
}
