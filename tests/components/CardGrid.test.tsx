import { describe, expect, test, vi } from "vitest";
import CardGrid from "../../src/components/CardGrid";
import { render, screen } from "@testing-library/react";
import { Product } from "../../src/types/productTypes";

vi.mock("../Card", () => ({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    default: (props: any) => <div data-testid="card">{props.name}</div>,
}));

describe("Prueba de grid cartas de producto", () => {
    test("Muestra error si no hay productos", () => {
        // arrange
        const mockProducts: Product[] = [];
        const mockLoading = false;
        const mockError = null;

        // act
        render(
            <CardGrid
                products={mockProducts}
                loading={mockLoading}
                error={mockError}
            ></CardGrid>
        );

        //assert
        const noProductElement = screen.queryByText(
            "No hay productos para mostrar."
        );

        expect(noProductElement).toBeTruthy();

        const cardElements = screen.queryAllByTestId("card");
        expect(cardElements).toHaveLength(0);
    });
});
