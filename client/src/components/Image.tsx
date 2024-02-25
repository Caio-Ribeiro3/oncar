// import AspectRatio from '@mui/joy/AspectRatio';

interface ImageProps {
    src: string;
    width: number;
    height: number;
    alt: string;
    style?: React.CSSProperties;
}

export default function Image(props: ImageProps) {
    const { height, src, width, alt, style } = props

    return (
        <img
            src={src}
            width={width}
            height={height}
            alt={alt}
            style={{ objectFit: 'contain', ...style }}
            loading="lazy"
        />
    )
}