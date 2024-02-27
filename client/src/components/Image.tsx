import AspectRatio from '@mui/joy/AspectRatio';

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
        <AspectRatio minHeight={`${height}px`} maxHeight={`${width}px`}>
            <img
                src={src}
                width={width}
                height={height}
                alt={alt}
                style={{ objectFit: 'cover', ...style }}
                loading="lazy"
            />
        </AspectRatio>
    )
}