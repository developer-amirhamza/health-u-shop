export const validURLConvert = (title:"title")=>{
    const url = title?.toString().replaceAll(" ", "-").replaceAll(",", "-").replaceAll("&", "-")
    return url
}