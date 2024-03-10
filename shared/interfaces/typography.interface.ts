export interface ITypographyProps {
    variant?: 'heading' | 'subheading' | 'body';
    color?: string;
    size?:any;
    style?: object;
    fontStyle?: 'normal' | 'italic';
    // fontFamily?: 'default' | 'primary' |'secondary';
    [key: string]: any;
    fontFamily?: string;
}