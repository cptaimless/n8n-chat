import React, { useEffect, useRef } from "react";
import mermaid from "mermaid";

// Official documentation: https://mermaid.js.org/config/usage.html

const MermaidRenderer = ({ chart }: { chart: string }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isActive = true;

    mermaid.initialize({ startOnLoad: false, theme: "dark" });
    
    const uniqueId = "mermaidSvg" + Math.random().toString(36).replace('.', '');
    
    const renderMermaid = async () => {
      if (ref.current) {
        try {
          // Syntax validation without rendering to catch errors early
          if (await mermaid.parse(chart)) {
            const { svg } = await mermaid.render(uniqueId, chart);
            if (isActive && ref.current) {
              ref.current.innerHTML = svg;
            }
          }
        } catch (err) {
          if (isActive && ref.current) {
            ref.current.innerHTML = `<pre style="color:red;">⚠️ <strong>Mermaid error</strong> ⚠️\n${err.message}</pre>`;
          }
        }
      }
    };

    renderMermaid();

    return () => {
      isActive = false;
    };
  }, [chart]);

  return <div ref={ref} />;
};

export default MermaidRenderer;