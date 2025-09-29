const MetaContainer = ({ title, description, children }) => (
  <>
    <title>{title}</title>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    {children}
  </>
);

export default MetaContainer;
