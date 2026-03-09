function formatDate(dateStr) {
    let [year, month, day] = dateStr.split("T")[0].split("-");
    return month + `/` + day + `/` + year;
};

function priorityStyle(priorityStr) {
    switch (priorityStr) {
        case 'high':
            return "badge-high";
        case 'medium':
            return "badge-medium";
        case 'low':
            return "badge-low";
        default:
            return;
    }
};

function labelStyle(label) {
    const labelElm = document.createElement('div');
    labelElm.className = "badge badge-outline rounded-full uppercase font-medium ";
    switch (label) {
        case 'bug':
            labelElm.className += "badge-secondary bg-[#feecec]";
            labelElm.innerHTML = "" + label;
            break;
        case 'enhancement':
            labelElm.className += "badge-success bg-[#f1fcf6]";
            labelElm.innerHTML = "" + label;
            break;
        case 'help wanted':
            labelElm.className += "badge-warning bg-[#fff8db]";
            labelElm.innerHTML = "" + label;
            break;
        case 'good first issue':
            labelElm.className += "badge-primary bg-[#edf0fe]";
            labelElm.innerHTML = "" + label;
            break;
        case 'documentation':
            labelElm.className += "bg-[#eeeff2]";
            labelElm.innerHTML = "" + label;
        default:
            labelElm.innerHTML = "" + label;
            break;
    }
    return labelElm.outerHTML;
};

function displayIssue(issueArray) {
    const issueContainer = document.getElementById('issue-container');
    //issueContainer.innerHTML = "";
    issueContainer.innerHTML += issueArray.map(issue => `<div class="card bg-white border-1 border-t-4 ${(issue.status === "open") ? `border-t-emerald-500 shadow-emerald-500/5 border-emerald-200` : `border-t-purple-500 shadow-purple-500/5 border-purple-200`} rounded-lg shadow-md ">
                        <div class="p-4">
                            <div class="flex flex-col gap-3">
                                <div class="flex justify-between items-center">
                                    <div class="bg-[#cbfadb] rounded-full"><img src="./assets/${(issue.status === "open") ? `Open-Status` : `Closed- Status `}.png"
                                            alt="stat"></div>

                                    <div class="badge badge-soft ${priorityStyle(issue.priority)} rounded-full uppercase">${issue.priority}</div>
                                </div>
                                <div class="title mt-3">
                                    <p class="text-sm font-semibold">
                                        ${issue.title}
                                    </p>
                                    <p class="text-xs color-grey mt-2 line-clamp-2">
                                        ${issue.description}
                                    </p>
                                </div>
                                <div class="tags mt-3 flex flex-wrap gap-1">${issue.labels.map(label => labelStyle(label)).join('')}
                                    <!-- <div
                                        class="badge badge-outline badge-secondary bg-[#feecec] rounded-full uppercase font-medium">
                                        bug</div>
                                    <div
                                        class="badge badge-outline badge-warning bg-[#fff8db] rounded-full uppercase font-medium">
                                        help wanted</div> -->
                                </div>
                            </div>
                        </div>
                        <hr class="w-full border-[1px] opacity-6">
                        <div class="p-4">
                            <div class="card-footer">
                                <p class="info-owner color-grey text-xs">#${issue.id} by ${issue.author}</p>
                                <p class="info-date color-grey text-xs">${formatDate(issue.updatedAt)}</p>
                            </div>
                        </div>
                    </div>`).join('');

    console.log(issueArray);
}

const fetchIssues = async () => {
    try {
        const response = await fetch('https://phi-lab-server.vercel.app/api/v1/lab/issues');
        const data = await response.json();
        displayIssue(data.data);
    } catch (error) {
        console.error("fetch error:", error);
    }
};

fetchIssues();


