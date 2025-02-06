import React from 'react';

function AprioriResult({ frequentitemset, associationRules }) {
    // Destructure the frequent itemsets
    const { itemsets, support: itemsetsSupport } = frequentitemset || {};

    // Destructure the association rules
    const {
        "antecedent support": antecedentSupport,
        antecedents,
        confidence,
        "consequent support": consequentSupport,
        consequents,
        lift,
        conviction,
        leverage,
        representativity
    } = associationRules || {};

    // Validate frequent itemsets data
    if (
        !Array.isArray(itemsets) ||
        !Array.isArray(itemsetsSupport) ||
        itemsets.length !== itemsetsSupport.length
    ) {
        return <p>Error: Invalid data structure for frequent itemsets</p>;
    }

    // Validate association rules data
    if (
        !Array.isArray(antecedents) ||
        !Array.isArray(consequents) ||
        !Array.isArray(antecedentSupport) ||
        !Array.isArray(consequentSupport) ||
        !Array.isArray(confidence) ||
        !Array.isArray(lift) ||
        !Array.isArray(conviction) ||
        !Array.isArray(leverage) ||
        !Array.isArray(representativity) ||
        antecedents.length !== consequents.length ||
        antecedents.length !== antecedentSupport.length
    ) {
        return <p>Error: Invalid data structure for association rules</p>;
    }

    // Function to ensure each item is joined properly if it's an array
    const renderItemSet = (itemSet) => {
        if (Array.isArray(itemSet)) {
            return itemSet.join(', ');
        }
        return itemSet; // Return the itemSet as is if it's not an array
    };

    return (
        <>
            <h1>Frequent Itemsets</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Item Set</th>
                        <th>Support</th>
                    </tr>
                </thead>
                <tbody>
                    {itemsets.map((itemSet, index) => (
                        <tr key={index}>
                            <td>{renderItemSet(itemSet)}</td> {/* Use the renderItemSet function */}
                            <td>{itemsetsSupport[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h1>Association Rules</h1>
            <table border="1">
                <thead>
                    <tr>
                        <th>Antecedent</th>
                        <th>Consequent</th>
                        <th>Antecedent Support</th>
                        <th>Consequent Support</th>
                        <th>Confidence</th>
                        <th>Lift</th>
                        <th>Conviction</th>
                        <th>Leverage</th>
                        <th>Representativity</th>
                    </tr>
                </thead>
                <tbody>
                    {antecedents.map((antecedent, index) => (
                        <tr key={index}>
                            <td>{renderItemSet(antecedent)}</td> {/* Use the renderItemSet function */}
                            <td>{renderItemSet(consequents[index])}</td> {/* Use the renderItemSet function */}
                            <td>{antecedentSupport[index]}</td>
                            <td>{consequentSupport[index]}</td>
                            <td>{confidence[index]}</td>
                            <td>{lift[index]}</td>
                            <td>{conviction[index]}</td>
                            <td>{leverage[index]}</td>
                            <td>{representativity[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}

export default AprioriResult;
