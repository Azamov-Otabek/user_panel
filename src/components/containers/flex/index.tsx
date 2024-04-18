import "./style.scss"

const index = ({children}:any) => {
    return (
        <div className="flex">
            {children}
        </div>
    );
};

export default index;