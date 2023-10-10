interface ResponsivePictureProps {
    path: string;
    nameOfClass: string;
}

const ResponsivePicture: React.FC<ResponsivePictureProps> = (props) => {
    return (
        <picture className={props.nameOfClass}>
            <source
                srcSet={`${props.path}-small.jpg`}
                media="(max-width: 25rem)"
            />
            <source
                srcSet={`${props.path}-medium.jpg`}
                media="(max-width: 50rem)"
            />
            <img srcSet={`${props.path}.jpg`} />
        </picture>
    );
};

export default ResponsivePicture;
