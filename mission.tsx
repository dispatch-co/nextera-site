import Head from 'next/head'
import Link from 'next/link'
import {useEffect,useMemo,useState} from 'react'
import {ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend, CartesianGrid} from 'recharts'

function fmt(d){return d.toISOString().slice(0,10)}
export default function Mission(){
  const [range,setRange]=useState(14),[cme,setCme]=useState([]),[sep,setSep]=useState([]),[loading,setLoading]=useState(false)
  useEffect(()=>{const now=new Date(),end=fmt(now),start=fmt(new Date(now.getTime()-1000*60*60*24*range));setLoading(true);
    Promise.all([fetch(`/api/nasa/cme?startDate=${start}&endDate=${end}`).then(r=>r.json()),fetch(`/api/nasa/sep?startDate=${start}&endDate=${end}`).then(r=>r.json())])
    .then(([cj,sj])=>{setCme(Array.isArray(cj?.data)?cj.data:[]);setSep(Array.isArray(sj?.data)?sj.data:[])}).finally(()=>setLoading(false))},[range])
  const data=useMemo(()=>{const m={};const add=(d,k)=>{m[d]=m[d]||{date:d,CME:0,SEP:0};m[d][k]+=1};cme.forEach(e=>e.startTime&&add(e.startTime.slice(0,10),'CME'));sep.forEach(e=>e.eventTime&&add(String(e.eventTime).slice(0,10),'SEP'));return Object.values(m).sort((a,b)=>a.date.localeCompare(b.date))},[cme,sep])
  return (<div style={{minHeight:'100vh',background:'black',color:'white',padding:24}}><Head><title>Mission Control</title></Head><h1>Mission Control</h1><Link href="/">Home</Link><div><span>Range:</span>{[7,14,30,60].map(n=>(<button key={n} onClick={()=>setRange(n)} style={{margin:6,padding:'6px 10px',background:range===n?'#333':'#222'}}>{n}d</button>))}{loading&&<span> Loading…</span>}</div><div style={{height:360,background:'#111',padding:12,borderRadius:12,marginTop:12}}><ResponsiveContainer width="100%" height="100%"><LineChart data={data}><CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)"/><XAxis dataKey="date" stroke="#aaa"/><YAxis stroke="#aaa" allowDecimals={false}/><Tooltip contentStyle={{background:'#111',border:'1px solid rgba(255,255,255,0.2)',color:'#fff'}}/><Legend/><Line type="monotone" dataKey="CME" stroke="#7dd3fc" strokeWidth={2} dot={false}/><Line type="monotone" dataKey="SEP" stroke="#fca5a5" strokeWidth={2} dot={false}/></LineChart></ResponsiveContainer></div></div>)}
