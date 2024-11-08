export default function convertToProperUrl(url: string): string {
    // Check if the URL starts with 'www.'
    if (url.startsWith('www.')) {
      return 'http://' + url; // or 'https://' based on your preference
    }
    // If the URL already has a scheme (http or https), return it as is
    if (/^https?:\/\//i.test(url)) {
      return url;
    }
    // If no scheme and doesn't start with www, just return the original
    return url; 
  }