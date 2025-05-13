export default function generateTimes(start: string, end: string, interval = 30): string[] {
    const result: string[] = []
    let [h, m] = start.split(':').map(Number)
    const [endH, endM] = end.split(':').map(Number)

    while (h < endH ||(h === endH && m < endM)){
        result.push(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2,'0')}`)
        m += interval
        if(m >= 60){
            h += 1
            m %= 60
        }
    }
    
    return result
}