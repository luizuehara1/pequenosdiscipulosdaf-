// Utility for safe Meta Pixel and analytics tracking

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    META_PIXEL_ID?: string;
    gtag?: (...args: any[]) => void;
  }
}

export function trackPageView() {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'PageView');
    } catch {
      // ignore
    }
  }
}

export function trackViewContent(contentName: string = 'Pequenos Discípulos da Fé - Atividades Bíblicas') {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'ViewContent', {
        content_name: contentName,
        content_category: 'Educação Cristã Infantil',
        currency: 'BRL',
      });
    } catch {
      // ignore
    }
  }
}

export function trackInitiateCheckout(planName: string, value: number) {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    try {
      window.fbq('track', 'InitiateCheckout', {
        content_name: planName,
        content_category: 'Atividades Bíblicas Infantis',
        value: value,
        currency: 'BRL',
        num_items: 1,
      });
    } catch {
      // ignore
    }
  }

  // Also Google Analytics 4 if configured
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    try {
      window.gtag('event', 'begin_checkout', {
        currency: 'BRL',
        value: value,
        items: [
          {
            item_name: planName,
            price: value,
            quantity: 1,
          },
        ],
      });
    } catch {
      // ignore
    }
  }
}
