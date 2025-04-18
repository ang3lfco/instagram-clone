export default function Avatar({src}:{src:string}){
    return(
        <div className="size-16 aspect-square overflow-hidden rounded-full">
            <img className="" src={src} alt=""/>
        </div>
    );
}