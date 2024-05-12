type Props = {
  showNotification: boolean;
};

export default function Notification({ showNotification }: Props) {
  return (
    <div className={`notification-container ${showNotification ? "show" : ""}`}>
      You Already Entered this letter
    </div>
  );
}
