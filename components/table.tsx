import { useState } from "react";

function Table({ setSelectedValue }: any) {
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };

  return (
    <table>
      <tbody className="divide-y divide-[gray]">
        <tr className="tableRow">
          <td className="tableDataTitle">Monthly price</td>

          <td className={`tableDataFeature`}>49</td>
          <td className={`tableDataFeature`}>99</td>
          <td className={`tableDataFeature`}>199</td>
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Video quality</td>
          <td className={`tableDataFeature `}>Good</td>
          <td className={`tableDataFeature `}>Better</td>
          <td className={`tableDataFeature `}>Best</td>
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">Resolution</td>

          <td className={`tableDataFeature `}>480px</td>
          <td className={`tableDataFeature `}>720px</td>
          <td className={`tableDataFeature `}>1080px</td>
        </tr>

        <tr className="tableRow">
          <td className="tableDataTitle">
            Watch on your TV, computer, mobile phone and tablet
          </td>

          <td className={`tableDataFeature`}>
            <input
              type="radio"
              name="price"
              value="49"
              className="w-5 h-5 !rounded-none"
              onChange={handleRadioChange}
            />
          </td>
          <td className={`tableDataFeature`}>
            <input
              type="radio"
              name="price"
              value="99"
              className="w-5 h-5 !rounded-none"
              onChange={handleRadioChange}
            />
          </td>
          <td className={`tableDataFeature`}>
            <input
              type="radio"
              name="price"
              value="199"
              className="w-5 h-5 !rounded-none"
              onChange={handleRadioChange}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export default Table;
