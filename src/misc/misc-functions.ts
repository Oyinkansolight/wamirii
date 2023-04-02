export class Misc {
  static queryStringToJSON<T>(s: string) {
    if (!s) {
      return;
    }
    const pairs = s.split('&');
    const result: { [x: string]: unknown } = {};
    pairs.forEach((pair) => {
      const p = pair.split('=');
      const v = decodeURIComponent(p[1] || '');
      result[p[0]] = v === '' ? null : v;
    });

    return result as T;
  }
}
