import type { NextApiRequest, NextApiResponse } from 'next'
import { nasaFetch } from '../../../lib/nasa'
export default async function handler(req: NextApiRequest, res: NextApiResponse){ try{ const {startDate,endDate}=req.query as any; const data=await nasaFetch('DONKI/CME',{startDate,endDate}); res.status(200).json({ok:true,data}) } catch(e:any){ res.status(500).json({ok:false,error:e?.message||'Error'}) } }
