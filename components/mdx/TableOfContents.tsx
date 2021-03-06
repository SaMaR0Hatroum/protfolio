// @ts-nocheck
import React from 'react';
// TODO: add types
// @ts-ignore
const Headings = ({ headings, activeId }) => (
  <ul className="space-y-3">
    {headings.map((heading) => (
      <li
        key={heading.id}
        className={`space-y-3 ${
          heading.id === activeId
            ? 'text-blue-400 dark:text-blue-300'
            : 'text-gray-350 dark:text-gray-200'
        }`}
      >
        <a
          href={`#${heading.id}`}
          onClick={(e) => {
            e.preventDefault();
            document.querySelector(`#${heading.id}`).scrollIntoView({
              behavior: 'smooth',
            });
          }}
        >
          {heading.title}
        </a>
        {heading.items.length > 0 && (
          <ul className="ml-4 space-y-4">
            {heading.items.map((child) => (
              <li
                key={child.id}
                className={
                  child.id === activeId
                    ? 'text-blue-400 dark:text-blue-300'
                    : 'text-gray-350 dark:text-gray-200'
                }
              >
                <a
                  href={`#${child.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector(`#${child.id}`).scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  {child.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </li>
    ))}
  </ul>
);

const useHeadingsData = () => {
  const [nestedHeadings, setNestedHeadings] = React.useState([]);

  React.useEffect(() => {
    const headingElements = Array.from(
      document.querySelectorAll('main h2, main h3')
    );

    // Created a list of headings, with H3s nested
    const newNestedHeadings = getNestedHeadings(headingElements);
    setNestedHeadings(newNestedHeadings);
  }, []);

  return { nestedHeadings };
};

const getNestedHeadings = (headingElements) => {
  const nestedHeadings = [];

  headingElements.forEach((heading, index) => {
    const { innerText: title, id } = heading;

    if (heading.nodeName === 'H2') {
      nestedHeadings.push({ id, title, items: [] });
    } else if (heading.nodeName === 'H3' && nestedHeadings.length > 0) {
      nestedHeadings[nestedHeadings.length - 1].items.push({
        id,
        title,
      });
    }
  });

  return nestedHeadings;
};

const useIntersectionObserver = (setActiveId) => {
  const headingElementsRef = React.useRef({});
  React.useEffect(() => {
    const callback = (headings) => {
      headingElementsRef.current = headings.reduce((map, headingElement) => {
        map[headingElement.target.id] = headingElement;
        return map;
      }, headingElementsRef.current);

      // Get all headings that are currently visible on the page
      const visibleHeadings = [];
      Object.keys(headingElementsRef.current).forEach((key) => {
        const headingElement = headingElementsRef.current[key];
        if (headingElement.isIntersecting) visibleHeadings.push(headingElement);
      });

      const getIndexFromId = (id) =>
        headingElements.findIndex((heading) => heading.id === id);

      // If there is only one visible heading, this is our "active" heading
      if (visibleHeadings.length === 1) {
        setActiveId(visibleHeadings[0].target.id);
        // If there is more than one visible heading,
        // choose the one that is closest to the top of the page
      } else if (visibleHeadings.length > 1) {
        const sortedVisibleHeadings = visibleHeadings.sort(
          (a, b) => getIndexFromId(a.target.id) > getIndexFromId(b.target.id)
        );

        setActiveId(sortedVisibleHeadings[0].target.id);
      }
    };

    const observer = new IntersectionObserver(callback, {
      root: document.querySelector('iframe'),
      rootMargin: '500px',
    });

    const headingElements = Array.from(document.querySelectorAll('h2, h3'));

    headingElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [setActiveId]);
};

export const TableOfContents = () => {
  const [activeId, setActiveId] = React.useState();
  const { nestedHeadings } = useHeadingsData();
  useIntersectionObserver(setActiveId);

  return (
    <aside
      style={{ maxHeight: 'calc(100vh - 148px)' }}
      className="hidden lg:inline lg:m-12 py-24 fixed h-screen top-6 max-w-sm overflow-auto"
    >
      <h4
        id="table-of-contents"
        className="mt-5 text-md capitalize font-medium tracking-wide mb-2"
      >
        Table of contents
      </h4>
      <Headings headings={nestedHeadings} activeId={activeId} />
    </aside>
  );
};
