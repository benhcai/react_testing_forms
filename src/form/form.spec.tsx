import { findByText, render, screen } from "@testing-library/react"
import {MultiStepForm} from "./form"
import * as submit from "../App"
import user from "@testing-library/user-event"

// const onSubmitMock = jest.spyOn(submit, "onSubmit")

describe("form", () => {
    describe("when next submit button is clicked", () => {
        test("shows an error if the first name input in empty", async () => {
            // @ts-ignore
            render(<MultiStepForm onSubmit={jest.fn()}/>)
            await user.click(getNextButton())
            expect(await screen.findByText("Your First Name is Required")).toBeInTheDocument()
        })
    })
})

const getFirstname = () => {
    return screen.getByText(/first name/i)
}

const getNextButton = () => {
    return screen.getByRole("button", {name: /next/i})
}