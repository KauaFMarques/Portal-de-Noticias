const InfosCardNoticia = ({ title, category, resume }) => {
  return (
    <div>
      <span style={{ color: "#3E57FF" }}>{category} </span>
      <span>- Nome do Autor</span>
      <h2 style={{ marginTop: "10px" }} title={title}>
        {title.length > 100 ? title.substring(0, 100).trim() + "..." : title}
      </h2>
      {resume && (
        <p style={{ marginTop: "12px" }}>
          {resume.length > 810
            ? resume.substring(0, 810).trim() + "..."
            : resume}
        </p>
      )}
    </div>
  );
};

export default InfosCardNoticia;
