import type { NextApiRequest, NextApiResponse } from 'next'
import { getAPOD } from '../../../lib/nasa'
export default async function handler(req: NextApiRequest, res: NextApiResponse){ try{ const data=await getAPOD(); res.status(200).json({ok:true,data}) } catch(e:any){ res.status(500).json({ok:false,error:e?.message||'Error'}) } }
