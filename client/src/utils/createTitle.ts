export const createTitle = (content: string) => {
    if(!content) return;
    let title = '';

    for(let i = 0;i < 2;i ++) {
        title += content.split(' ')[i];
    }

    return title
}