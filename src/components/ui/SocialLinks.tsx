import { FaGithub, FaLinkedinIn, FaXTwitter, FaInstagram, FaDribbble } from 'react-icons/fa6';
import { Mail } from 'lucide-react';
import { socialLinks } from '@/data/site';
import { cn } from '@/lib/utils';

const iconMap = {
  github: FaGithub,
  linkedin: FaLinkedinIn,
  twitter: FaXTwitter,
  instagram: FaInstagram,
  dribbble: FaDribbble,
  mail: Mail,
};

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      {socialLinks.map((social) => {
        const Icon = iconMap[social.icon];
        return (
          <a
            key={social.label}
            href={social.href}
            target={social.icon === 'mail' ? undefined : '_blank'}
            rel="noreferrer"
            aria-label={social.label}
            className="glass flex h-10 w-10 items-center justify-center rounded-full text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-text)] hover:border-[var(--color-border-strong)]"
          >
            <Icon size={16} />
          </a>
        );
      })}
    </div>
  );
}
