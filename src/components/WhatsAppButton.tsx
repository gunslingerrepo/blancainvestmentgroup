import { whatsappLink } from "@/content/site";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppButton() {
  return (
    <a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Blanca Investment on WhatsApp (opens in a new tab)"
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-0 bg-[#25D366] text-white shadow-[0_12px_30px_-10px_rgba(0,0,0,0.5)] transition-[background-color,gap] duration-[1200ms] hover:gap-2 hover:bg-[#1da851] sm:bottom-7 sm:right-7"
    >
      <span className="grid size-14 place-items-center"><WhatsAppIcon className="size-7" /></span>
      <span className="max-w-0 overflow-hidden whitespace-nowrap font-display text-sm font-medium transition-[max-width,padding] duration-[1200ms] group-hover:max-w-40 group-hover:pr-5">
        Chat with us
      </span>
    </a>
  );
}
