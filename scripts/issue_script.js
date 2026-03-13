function formatDate(dateStr) {
    let [year, month, day] = dateStr.split("T")[0].split("-");
    return month + `/` + day + `/` + year;
};

function priorityStyle(priorityStr) {
    switch (priorityStr) {
        case 'high':
            return "badge-red";
        case 'medium':
            return "badge-yellow";
        case 'low':
            return "badge-gray";
        default:
            return;
    }
};

function labelStyle(label) {
    const labelElm = document.createElement('div');
    labelElm.className = "badge badge-outline rounded-full uppercase font-medium text-[11px] p-2 gap-1 ";
    switch (label) {
        case 'bug':
            labelElm.className += "badge-secondary bg-[#feecec]";
            labelElm.innerHTML = `<i class="fa-solid fa-bug text-[10px]"></i>` + label;
            break;
        case 'enhancement':
            labelElm.className += "badge-success bg-[#f1fcf6]";
            labelElm.innerHTML = `<i class="fa-solid fa-wand-magic-sparkles text-[10px]"></i>` + label;
            break;
        case 'help wanted':
            labelElm.className += "badge-warning bg-[#fff8db]";
            labelElm.innerHTML = `<i class="fa-regular fa-life-ring text-[10px]"></i>` + label;
            break;
        case 'good first issue':
            labelElm.className += "badge-primary bg-[#edf0fe]";
            labelElm.innerHTML = `<i class="fa-solid fa-seedling text-[10px]"></i>` + label;
            break;
        case 'documentation':
            labelElm.className += "bg-[#eeeff2]";
            labelElm.innerHTML = `<i class="fa-solid fa-book text-[10px]"></i>` + label;
        default:
            break;
    }
    return labelElm.outerHTML;
};

function displayIssue(issueArray) {
    const issueContainer = document.getElementById('issue-container');
    issueContainer.addEventListener("click", (event) => {
        document.getElementById("modal-" + event.target.id.split("-")[1]).showModal();
    });
    issueContainer.innerHTML += issueArray.map(issue => `<div class="cursor-pointer group relative flex flex-col card bg-white border-1 border-t-4 hover:border-3 ${(issue.status === "open") ? `border-t-emerald-500 shadow-emerald-500/5 border-emerald-200` : `border-t-purple-500 shadow-purple-500/5 border-purple-200`} rounded-lg shadow-md ">
                        <div class="p-4 flex-1">
                            <div class="h-full flex flex-col gap-3">
                                <div class="flex justify-between items-center">
                                    <div class="bg-[#cbfadb] rounded-full"><img src="./assets/${(issue.status === "open") ? `Open-Status` : `Closed- Status `}.png"
                                            alt="stat"></div>

                                    <div class="px-5 badge badge-soft ${priorityStyle(issue.priority)} rounded-full uppercase">${issue.priority}</div>
                                </div>
                                <div class="title mt-3 flex-1">
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
                        <dialog id="modal-${issue.id}" class="modal modal-bottom sm:modal-middle">
  <div class="modal-box max-w-3/7">
    <div class="p-3">
                            <div class="h-full flex flex-col gap-6">
                                <div class="flex flex-col gap-2">
                                <p class="text-2xl font-bold">
                                        ${issue.title}
                                    </p>
                                    <div class="flex gap-2">
                                    <div class="px-2 text-white badge badge-${(issue.status === "open") ? `success` : `primary`} rounded-full uppercase">${issue.status}ed</div>
                                    <span class="text-sm color-grey capitalize font-bold" > • </span>
                                    <span class="text-sm color-grey capitalize" >${issue.status}ed by ${issue.author}</span>
                                    <span class="text-sm color-grey capitalize font-bold" > • </span>
                                    <span class="text-sm color-grey capitalize" >${formatDate(issue.updatedAt)}</span>
                                </div>
                                    </div>
                                    <div class="tags flex flex-wrap gap-1">${issue.labels.map(label => labelStyle(label)).join('')}
                                </div>
                                <p class="text-base color-grey">
                                        ${issue.description}
                                    </p>
                                
                <div class="w-full p-6 bg-white-grey rounded-lg flex items-center">
                    <p class="text-base color-grey">Assignee:<span class="font-semibold capitalize color-black"><br>${issue.author}</span></p>
                    <p class="text-base color-grey">Priority:<br><span class="px-2 text-sm font-medium text-white bg-${priorityStyle(issue.priority).split("-")[1]}-600 rounded-full uppercase">${issue.priority}</span></p>
                </div>
                              
                            </div>
                            <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn btn-primary">Close</button>
      </form>
    </div>  
                        </div>
                        
    
  </div>
  <form method="dialog" class="modal-backdrop">
    <button>close</button>
  </form>
</dialog>
                        <div id="issue-${issue.id}" class="uppercase text-white font-bold text-2xl absolute top-0 left-0 w-full h-full z-100 rounded-md bg-slate-600/20 opacity-0 group-hover:opacity-100 transition-opacity text-center flex justify-center items-center">
                        view
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


