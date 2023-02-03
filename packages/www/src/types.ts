import { CheckinData } from "../../data/types";

export type PopupEventHandler = (checkin: CheckinData) => void;

export type FeedEventHandler = (checkin: CheckinData) => void;
