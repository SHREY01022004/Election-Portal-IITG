export const styles = (theme) => ({
  cropContainer: {
    position: "relative",
    width: "100%",
    height: 200,
    background: "#333",
    [theme.breakpoints.up("sm")]: {
      height: 400,
    },
  },
  cropButton: {
    flexShrink: 0,
    display: "block",
    marginLeft: "auto",
    backgroundColor: "#2B00FF",
    color: "white",
    boxShadow: "0px 2px 1px rgb(0 0 0 / 5%), 0px 0px 1px rgb(0 0 0 / 25%)",
    borderRadius: "6px",
    fontWeight: "600",
    padding: "0.625rem 2.75rem",
    fontSize: "100%",
    textTransform: "none",
  },
  controls: {
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
    },
  },
  sliderContainer: {
    display: "flex",
    flex: "1",
    alignItems: "center",
  },
  sliderLabel: {
    [theme.breakpoints.down("xs")]: {
      minWidth: 65,
    },
  },
  slider: {
    padding: "22px 0px",
    marginLeft: 32,
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row",
      alignItems: "center",
      margin: "0 16px",
    },
  },
});
