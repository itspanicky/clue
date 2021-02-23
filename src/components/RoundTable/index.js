import React, { useEffect } from "react";
import "./index.css";
import $ from "jquery";

// renders table where players sit around
function RoundTable({ players }) {
  useEffect(() => {
    function createFields() {
      $(".field").remove();

      let container = $("#roundTable__container");
      for (let i = 0; i < players.length; i++) {
        $("<div/>", {
          class: "field",
          text: i + 1,
        }).appendTo(container);
      }
    }

    function distributeFields() {
      let radius = 300,
        fields = $(".field"),
        container = $("#roundTable__container"),
        width = container.width(),
        height = container.height(),
        angle = 0,
        step = (2 * Math.PI) / fields.length;

      fields.each(function () {
        const x = Math.round(
          width / 2 + radius * Math.cos(angle) - $(this).width() / 2
        );
        const y = Math.round(
          height / 2 + radius * Math.sin(angle) - $(this).height() / 2
        );

        $(this).css({
          left: x + "px",
          top: y + "px",
        });
        angle += step;
      });
    }

    if (players.length) {
      createFields();
      distributeFields();
    }
  }, [players]);

  return (
    <div id="roundTable" className="roundTable">
      <div id="roundTable__container" className="roundTable__container">
        {/* Place players */}
      </div>
    </div>
  );
}

export default RoundTable;
