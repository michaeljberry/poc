function cssClasses(element) {
    if(!element?.marks?.length) return
    return element.marks.map(mark => {
        if(mark.type != 'link') return mappedClasses[mark.type]
    })
}

const mappedClasses = {
    underline: 'underline',
    bold: 'font-bold'
}

export { mappedClasses, cssClasses }