import SignupForm from "@/app/components/form/SignupForm";
import { CssBaseline, Card, CardContent } from "@mui/material";

export default function Home() {
  return (
    <>
      <CssBaseline />
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-[500px] p-6" elevation={5}>
          <CardContent>
            <SignupForm />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
