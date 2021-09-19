import React from "react";
import Select, { components } from "react-select";

const createStyleElement = (font) => {
  const weight = font.files.regular || font.files[300];
  const styleElm = document.createElement("style");
  if (!weight) {
    return styleElm;
  }
  styleElm.innerHTML = `
    @font-face {
      font-family: '${font.family}';
      font-style: normal;
      font-weight: 400;
      font-display: block;
      src: url(${weight.replace("http:", "https:")}) format('truetype');
    }
  `;
  return styleElm;
};

const appendRegularFontToHead = (font) => {
  // add to root head
  document
    .getElementsByTagName("head")[0]
    .appendChild(createStyleElement(font));

  // add to preview-iframe
  const iframe = document.getElementById("storybook-preview-iframe");
  if (iframe) {
    iframe.contentDocument.head.appendChild(createStyleElement(font));
  }
};

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const OPTION_HEIGHT = 24;
const LIST_HEIGHT = 300;
const RANGE = Math.ceil(300 / 24);

const MenuList = ({ innerRef, innerProps, ...props }) => {
  const menuListRef = React.useRef();
  const cacheRef = React.useRef({});

  const injectStyle = (menuListDOM) => {
    const scrollTop = menuListDOM.scrollTop;
    const middleItemIndex = Math.ceil(
      (scrollTop - 8) / OPTION_HEIGHT + LIST_HEIGHT / 2 / 24
    );
    let children = Array.isArray(props.children) ? props.children : [];
    children = children.slice(
      Math.max(0, middleItemIndex - RANGE),
      Math.min(middleItemIndex + RANGE, children.length)
    );
    const filteredChildren = children.filter(
      ({ props: { data } }) => !cacheRef.current[data.family]
    );

    filteredChildren.forEach(({ props: { data: font } }) => {
      appendRegularFontToHead(font);
      cacheRef.current[font.family] = true;
    });
  };

  React.useEffect(() => {
    const handleScroll = debounce((event) => {
      injectStyle(event.target);
    });
    if (menuListRef.current) {
      menuListRef.current.addEventListener("scroll", handleScroll);

      return () => {
        if (menuListRef.current) {
          menuListRef.current.removeEventListener("scroll", handleScroll);
        }
      };
    }
  }, []);

  React.useEffect(() => {
    if (menuListRef.current) {
      injectStyle(menuListRef.current);
    }
  }, [props.children.length]);

  return (
    <components.MenuList
      innerRef={(dom) => {
        menuListRef.current = dom;
        innerRef.current = dom;
      }}
      {...props}
    />
  );
};

const Option = ({ ...props }) => {
  return (
    <components.Option
      {...props}
      innerProps={{
        ...props.innerProps,
        style: { fontFamily: `'${props.data.label}', sans-serif` },
      }}
    />
  );
};

const SingleValue = ({ ...props }) => {
  return (
    <components.SingleValue
      {...props}
      innerProps={{
        ...props.innerProps,
        style: { fontFamily: `'${props.data.label}', sans-serif` },
      }}
    />
  );
};

export const GoogleFontSelect = ({ apiKey, minWidth = 156, ...props }) => {
  const [data, setData] = React.useState([]);
  const currentFont = props.value ? props.value.family : "";
  const htmlLink = React.useRef(document.createElement("link"));

  React.useEffect(() => {
    // storybook is loading iframe
    // contentDocument.head can be null
    function attachHtmlLink(head) {
      if (head) {
        const link1 = document.createElement("link");
        link1.rel = "preconnect";
        link1.href = "https://fonts.googleapis.com";

        const link2 = document.createElement("link");
        link2.rel = "preconnect";
        link2.href = "fonts.gstatic.com";
        link2.setAttribute("crossorigin", true);

        head.appendChild(link1);
        head.appendChild(link2);

        htmlLink.current.rel = "stylesheet";
        head.appendChild(htmlLink.current);
      }
    }
    const callUntil = () => {
      const timeout = setTimeout(() => {
        const iframe = document.getElementById("storybook-preview-iframe");
        if (!iframe.contentDocument.head) {
          callUntil();
        } else {
          attachHtmlLink(iframe.contentDocument.head);
        }
      }, 400);
      return timeout;
    };
    const timeout = callUntil();
    return () => {
      clearTimeout(timeout);
    };
  }, []);

  React.useEffect(() => {
    let mounted = true;
    if (apiKey) {
      fetch(
        `https://www.googleapis.com/webfonts/v1/webfonts?key=${apiKey}&sort=popularity`
      )
        .then((response) => response.json())
        .then((response) => {
          if (response && mounted) {
            setData(response.items || []);
          }
        });
    }
    return () => {
      mounted = false;
    };
  }, [apiKey]);

  React.useEffect(() => {
    if (currentFont) {
      const fontData = data.find(({ family }) => family === currentFont);
      if (fontData) {
        appendRegularFontToHead(fontData);
      }
    }
  }, [currentFont, data.length]);

  React.useEffect(() => {
    if (currentFont) {
      let apiUrl = [];
      apiUrl.push("https://fonts.googleapis.com/css2?family=");
      apiUrl.push(currentFont.replace(/ /g, "+"));
      apiUrl.push(":wght@");
      apiUrl.push([100, 200, 300, 400, 500, 600, 700, 800, 900].join(";"));
      apiUrl.push("&display=swap");

      apiUrl = apiUrl.join("");

      htmlLink.current.href = apiUrl;
    }
  }, [currentFont]);

  const options = data.map(({ family, ...item }) => ({
    family,
    ...item,
    label: family,
    value: family,
  }));
  return (
    <Select
      {...props}
      options={options}
      menuPortalTarget={document.body}
      components={{ Option, SingleValue, MenuList, ...props.components }}
      styles={{
        placeholder: (styles) => ({
          ...styles,
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
        }),
        valueContainer: (styles) => ({
          ...styles,
          paddingTop: 0,
          paddingBottom: 0,
        }),
        container: (styles) => ({
          ...styles,
          alignSelf: "center",
          minWidth,
          fontSize: 14,
        }),
        control: (styles) => ({
          ...styles,
          minHeight: "auto",
          border: "none",
          backgroundColor: "#efefef",
        }),
        indicatorsContainer: (styles) => ({
          ...styles,
          "& > div": {
            padding: 4,
          },
        }),
        menuList: (styles) => ({
          ...styles,
          maxHeight: LIST_HEIGHT,
        }),
        option: (styles) => ({
          ...styles,
          fontSize: "0.75rem",
          paddingTop: 0,
          paddingBottom: 0,
          height: OPTION_HEIGHT,
          display: "flex",
          alignItems: "center",
        }),
        ...props.styles,
      }}
    />
  );
};
