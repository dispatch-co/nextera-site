const API_KEY = process.env.NASA_API_KEY || 'DEMO_KEY';
export async function nasaFetch(path: string, params: Record<string,string|number> = {}) {
  const url = new URL(`https://api.nasa.gov/${path}`);
  for (const [k,v] of Object.entries(params)) url.searchParams.set(k, String(v));
  url.searchParams.set('api_key', API_KEY);
  const res = await fetch(url.toString());
  if (!res.ok) throw new Error(`NASA API error ${res.status}`);
  return res.json();
}
export async function getAPOD(){ return nasaFetch('planetary/apod'); }
