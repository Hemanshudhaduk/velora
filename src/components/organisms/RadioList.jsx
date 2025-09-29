import { ConvertUTCToUserTimeZone } from "@/src/utils";
import moment from "moment";
import { RadioCard } from "../molecules";
import { RadioGroupStyle } from "../style/EventStartDatePageStyle";

const RadioList = props => {
  const { dataList, handleChange, label, id, googleTimeZoneName, t } = props;

  const handleDateChange = event => {
    handleChange(event.target.value);
  };
  return (
    <>
      <RadioGroupStyle onChange={handleDateChange}>
        {dataList?.map(item => (
          <RadioCard
            label={moment(ConvertUTCToUserTimeZone(item[label], googleTimeZoneName))
              .locale(t("languageCode"))
              .format("ddd, DD MMM YYYY")}
            id={item[id]}
            key={item[id]}
          />
        ))}
      </RadioGroupStyle>
    </>
  );
};

export default RadioList;
