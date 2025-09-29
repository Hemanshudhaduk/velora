import Image from "next/image";

const CustomImg = props => {
  const { alt, redirectTo = null, borderRadius, unoptimize = false, ...otherProps } = props;

  if (otherProps.width) {
    if (redirectTo !== null)
      return (
        <a href={redirectTo} target="_blank">
          <Image unoptimized={unoptimize} alt={alt} {...otherProps} />
        </a>
      );
    else return <Image unoptimized={unoptimize} alt={alt} {...otherProps} />;
  }

  if (redirectTo !== null)
    return (
      <a href={redirectTo} target="_blank">
        <Image fill unoptimized={unoptimize} alt={alt} {...otherProps} />
      </a>
    );
  else return <Image unoptimized={unoptimize} fill alt={alt} {...otherProps} />;
};

export default CustomImg;
