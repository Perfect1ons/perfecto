import { getBoughts } from "@/api/requests"
import AllTodayBoughts from "@/components/HomeComponents/TodayBoughts/AllTodayBoughts/AllTodayBoughts"

export default async function page() {
    const boughts = await getBoughts(1)
  return (
    <AllTodayBoughts boughts={boughts.lastz}/>
  )
}
