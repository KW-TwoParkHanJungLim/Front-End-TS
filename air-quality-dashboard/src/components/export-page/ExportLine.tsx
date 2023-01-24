import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { utils, writeFile } from "xlsx";
import { fetchGraph } from "../../api/api";
import { getToday } from "../../pages/SensorEntryPage";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100px;
  background-color: rgba(0, 0, 0, 0.15);
  justify-content: flex-end;
`;

const SelectWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 30%;
  padding: 0 20px;
`;

const Select = styled.div<{ visible: boolean }>`
  display: flex;
  align-items: center;
  height: 45px;
  width: 160px;
  padding: 0 10px;
  border: ${(props) =>
    props.visible ? "2px solid #63cdda" : "1px solid rgba(0, 0, 0, 0.3)"};
  border-radius: 5px;
  background-color: white;
  position: relative;

  span {
    opacity: 0.6;
    font-weight: 600;
  }
`;

const OptionList = styled.ul`
  width: 160px;
  position: absolute;
  bottom: 45px;
  left: 0px;
  max-height: 200px;
  border-radius: 5px;
  overflow-y: scroll;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  font-weight: 600;
  padding: 0 5px;

  &::-webkit-scrollbar {
    display: none;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
`;

const Option = styled.li`
  display: flex;
  align-items: center;
  height: 45px;
  width: 140px;
  label {
    opacity: 0.7;
  }
`;

const ExportButton = styled.button`
  height: 45px;
  width: 160px;
  padding: 0 10px;
  background-color: #63cdda;
  border-radius: 5px;
  border: none;
  font-weight: 700;
  color: white;
  margin-left: 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #40739e;
  }
`;

const Arrow = styled(FontAwesomeIcon)`
  position: absolute;
  right: 12px;
  top: 10px;
  font-size: 24px;
  opacity: 0.5;
`;

const ErrorMSG = styled.div`
  font-size: 20px;
  font-weight: 600;
  color: #ea2027;
`;

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid rgba(0, 0, 0, 0.3);
  border-radius: 5px;
  width: 20px;
  height: 20px;
  margin-right: 10px;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: #63cdda;
  }

  &:hover {
    opacity: 0.5;
  }
`;

interface IProp {
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  sensorName: string[];
  sensorId: string[];
  startDate: Date;
}

interface IGraph {
  s_id: string;
  logtime: string;
  value: number;
  avg?: number;
}

const Attributes = [
  ["Temperature", "temp"],
  ["Humidity", "humi"],
  ["CO2", "co2"],
  ["TVOC", "tvoc"],
  ["PM1.0", "pm01"],
  ["PM2.5", "pm25"],
  ["PM10.0", "pm10"],
];

function ExportLine ({
  visible,
  setVisible,
  sensorName,
  sensorId,
  startDate,
}: IProp) {
  const [errorMessage, setErrorMessage] = useState("파일 형식 : XLSX");
  const [attr, setAttr] = useState<string[][]>([]);
  const excelFile = utils.book_new();

  async function sequentialReques() {
    for (let i = 0; i < attr.length; i++) {
      try {
        await fetchGraph(
          "axr-inducwon",
          getToday(startDate),
          sensorId,
          attr[i][1]
        )
          .then((res: IGraph[][]) => {
            if (res && res[0]) {
              const column: any = [];
              column.push(["Date"]);
              sensorName.forEach((v) => {
                column[0].push(v);
              });
              for (let i = 0; i < res[0].length - 1; i++) {
                column.push([]);
                column[i + 1].push(res[0][i].logtime.split(".")[0]);
                for (let j = 0; j < res.length; j++) {
                  column[i + 1].push(res[j][i].value);
                }
              }
              const test = utils.aoa_to_sheet(column);
              //test["!cols"] = [{ wpx: 130 }, { wpx: 100 }, { wpx: 80 }, { wch: 60 }];
              const size: any = [];
              for (let i = 0; i < column[0].length; i++) {
                size.push({ wpx: 130 });
              }
              test["!cols"] = size;
              utils.book_append_sheet(excelFile, test, attr[i][0]);
            } else if (res === undefined) {
              throw new Error("날짜 에러");
            } else if (res === null) {
              throw new Error("속성 에러");
            }
          })
          .catch((err) => {
            if (err.message === "날짜 에러") {
              setErrorMessage(
                `서버에 데이터가 없습니다. 다른 속성, 날짜를 선택해주세요`
              );
              throw new Error(err);
            } else if (err.message === "속성 에러") {
              setErrorMessage(
                `서버에 데이터가 없습니다. 다른 속성, 날짜를 선택해주세요 (원인 : ${attr[i][0]})`
              );
              throw new Error(err);
            }
          });
      } catch (err) {
        console.log(err);
        throw new Error();
      }
    }
  }

  const onClickExport = () => {
    setErrorMessage("로딩 중...");
    if (sensorName.length === 0) {
      setErrorMessage("센서를 최소 하나 이상 선택해야 합니다.");
      return;
    } else if (attr.length === 0) {
      setErrorMessage("공기질 속성을 최소 하나 이상 선택해야 합니다.");
      return;
    } else {
      sequentialReques()
        .then(() => {
          writeFile(excelFile, `${Date.now()}.xlsx`);
          setErrorMessage("Export 성공");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onClickAttr = (e: any) => {
    const newAttr = attr.slice();
    if (newAttr.find((v) => v[0] === e.target.name && v[1] === e.target.id)) {
      const idx = newAttr.findIndex(
        (v) => v[0] === e.target.name && v[1] === e.target.id
      );
      newAttr.splice(idx, 1);
      setAttr(newAttr);
    } else {
      newAttr.push([e.target.name, e.target.id]);
      setAttr(newAttr);
    }
  };

  const isChecked = (name: string) => {
    if (attr.find((v) => v[0] === name)) return true;
    else return false;
  };

  return (
    <Wrapper>
      <ErrorMSG>{errorMessage}</ErrorMSG>
      <SelectWrapper>
        <Select onClick={() => setVisible(true)} visible={visible}>
          <Arrow icon="angle-down"></Arrow>
          {visible ? (
            <OptionList>
              {Attributes.map((v) => {
                return (
                  <Option key={v[0]}>
                    <StyledInput
                      type="checkbox"
                      id={v[1]}
                      name={v[0]}
                      onClick={(e) => onClickAttr(e)}
                      defaultChecked={isChecked(v[0])}
                    />
                    <label>{v[0]}</label>
                  </Option>
                );
              })}
            </OptionList>
          ) : null}
          <span>All Attributes</span>
        </Select>
        <ExportButton onClick={onClickExport}>EXPORT</ExportButton>
      </SelectWrapper>
    </Wrapper>
  );
};

export default ExportLine;
