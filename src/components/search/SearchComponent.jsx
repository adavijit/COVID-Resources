import React,{useState,useRef} from 'react'
import './SearchComponent.css'

const SearchCompoent = ({data,setData})=>{
    const [textValue,setTextValue] = useState("")
    const timerRef = useRef()
    const SEARCH_TIME = 300
    const debounce = (fn)=>{
        return function(text){
            let context = this
            let args = arguments
            clearTimeout(timerRef.current)
            timerRef.current = setTimeout(
                function(){
                    fn.apply(context,[...args,text])
                },
                SEARCH_TIME)
        }
    }
    const search = (text)=>{
        let searchText = text.toLowerCase()
        if(text.trim()!=""){
            const temporaryData = data
            let filteredData = temporaryData.filter(
                (item)=>{
                    return item.area.toLowerCase().includes(searchText) || item.city.toLowerCase().includes(searchText)
                })
            setData(filteredData)
        }else{
            setData(data)
        }
    }
    const debouncedSearch = debounce(search)
    
    return (
        <div>
            <label 
            style={{marginLeft:"5%",
            fontStyle:"italic"}}>Search</label>
            <center>
                <div 
                style={{display:"flex",
                flexDirection:"column",
                justifyContent:"center",alignItems:"center"}}>
                    <input type="text" 
                    style={{
                        height:40,
                        width:"90%",
                        borderRadius:7,
                        padding:2
                        }}
                        onChange = {(e)=>{
                            debouncedSearch(e.target.value)
                            setTextValue(e.target.value)
                        }}
                        value = {textValue}
                        />
                </div>
            </center>
        </div>
    );
}

export default SearchCompoent;